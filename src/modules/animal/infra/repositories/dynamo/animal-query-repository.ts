import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Animal } from '@src/modules/animal/domain/animal';
import { IAnimalQueryRepository } from '../animal-query-repository';
import { AnimalMap } from './mappers/animal-map';

@injectable()
export class AnimalQueryRepository implements IAnimalQueryRepository {
  constructor(@inject(TYPES.DynamoDBClient) private dynamoClient: DynamoDBClient) {}

  async getById(id: string): Promise<Animal | undefined> {
    const queryCommand = new QueryCommand({
      TableName: process.env.DYNAMO_ANIMAL_TABLE,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: marshall({
        ':pk': id,
      }),
      ScanIndexForward: false,
      Limit: 1,
    });

    const result = await this.dynamoClient.send(queryCommand);

    if (!result || !result.Items || !result.Items[0]) return;

    return AnimalMap.toDomain(unmarshall(result.Items[0]));
  }
}
