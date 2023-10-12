import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { IUseCase } from '@src/core/use-case';

interface ShelteredAnimalRegistrationRequest {
  title: string;
  description: string;
  tags: string[];
  creatorId: string;
}

type ShelteredAnimalRegistrationResponse = void;

@injectable()
export class ShelteredAnimalRegistrationUseCase
  implements IUseCase<ShelteredAnimalRegistrationRequest, ShelteredAnimalRegistrationResponse>
{
  constructor(
    @inject(TYPES.IAnimalCommandRepository) private readonly animalCommandRepository: IAnimalCommandRepository,
  ) {}

  async execute({
    title,
    description,
    tags,
    creatorId,
  }: ShelteredAnimalRegistrationRequest): Promise<ShelteredAnimalRegistrationResponse> {
    const newShelteredAnimal = Animal.createNewSheltered({ title, description, tags, creatorId });

    await this.animalCommandRepository.save(newShelteredAnimal);
  }
}
