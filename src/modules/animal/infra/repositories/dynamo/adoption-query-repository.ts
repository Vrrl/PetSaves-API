import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { IAdoptionQueryRepository } from '../adoption-query-repository';
import { AdoptionRequest } from '@src/modules/animal/domain/adoption-request';
import { AdoptionRequestMap } from './mappers/adoption-request-map';

@injectable()
export class AdoptionQueryRepository implements IAdoptionQueryRepository {
  constructor(@inject(TYPES.DynamoDBClient) private dynamoClient: DynamoDBClient) {}

  async listRequestsByRequester(id: string): Promise<AdoptionRequest[]> {
    const queryCommand = new QueryCommand({
      TableName: process.env.DYNAMO_ADOPTION_TABLE,
      IndexName: 'RequesterIndex',
      KeyConditionExpression: 'requesterId = :rid',
      ExpressionAttributeValues: marshall(
        {
          ':requesterId': id,
        },
        { removeUndefinedValues: true },
      ),
    });

    const result = await this.dynamoClient.send(queryCommand);

    if (!result.Items) return [];

    return result.Items.map(x => AdoptionRequestMap.toDomain(unmarshall(x)));
  }
}
