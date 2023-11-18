import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { IUseCase } from '@src/core/use-case';
import { IAnimalQueryRepository } from '../../infra/repositories/animal-query-repository';
import { IPublicationQueryRepository } from '../../infra/repositories/publication-query-repository';
import _ from 'lodash';

interface AnimalFeedRequest {}

type AnimalFeedResponse = object[];

@injectable()
export class AnimalFeedUseCase implements IUseCase<AnimalFeedRequest, AnimalFeedResponse> {
  constructor(
    @inject(TYPES.IAnimalQueryRepository) private readonly animalQueryRepository: IAnimalQueryRepository,
    @inject(TYPES.IPublicationQueryRepository) private readonly publicationQueryRepository: IPublicationQueryRepository,
  ) {}

  async execute(): Promise<AnimalFeedResponse> {
    const publications = _.orderBy(await this.publicationQueryRepository.list(), x => x.createdAt, 'desc');

    if (!publications.length) return [];

    const animals = await this.animalQueryRepository.getBatch(publications.map(x => x.animalId));
    debugger;
    return publications.map(x => {
      return { ...x.toJson(), ...animals.find(y => y.id === x.animalId).toJson() };
    });
  }
}
