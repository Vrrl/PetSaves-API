import { AdoptionRequest } from '../../domain/adoption-request';

export interface IAdoptionQueryRepository {
  listRequestsByRequester(id: string): Promise<AdoptionRequest[]>;
}
