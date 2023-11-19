import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { IUseCase } from '@src/core/use-case';
import { Animal } from '../../domain/animal';
import { AnimalTypeEnum } from '../../domain/animal-type-enum';
import { AnimalSizeEnum } from '../../domain/animal-size-enum';
import { IAnimalCommandRepository } from '../../infra/repositories/animal-command-repository';
import { Publication } from '../../domain/publication';
import { IPublicationCommandRepository } from '../../infra/repositories/publication-command-repository';

interface ShelteredAnimalRegistrationRequest {
  rescuerId: string;
  name: string;
  type: AnimalTypeEnum;
  size: AnimalSizeEnum;
  ageInMonths: number;
  lastWeigth?: number;
  shelteredAt?: number;
  createPublication?: boolean;
  publicationDescription?: string;
  imageUrl: string;
}

type ShelteredAnimalRegistrationResponse = void;

@injectable()
export class ShelteredAnimalRegistrationUseCase
  implements IUseCase<ShelteredAnimalRegistrationRequest, ShelteredAnimalRegistrationResponse>
{
  constructor(
    @inject(TYPES.IAnimalCommandRepository) private readonly animalCommandRepository: IAnimalCommandRepository,
    @inject(TYPES.IPublicationCommandRepository)
    private readonly publicationCommandRepository: IPublicationCommandRepository,
  ) {}

  async execute({
    rescuerId,
    name,
    type,
    size,
    ageInMonths,
    lastWeigth,
    shelteredAt,
    createPublication,
    publicationDescription,
    imageUrl,
  }: ShelteredAnimalRegistrationRequest): Promise<ShelteredAnimalRegistrationResponse> {
    const newShelteredAnimal = Animal.createSheltered({
      rescuerId,
      name,
      type,
      size,
      ageInMonths,
      lastWeigth,
      shelteredAt,
      imageUrl,
    });

    await this.animalCommandRepository.save(newShelteredAnimal);

    if (createPublication) {
      const newPub = Publication.newPublication(rescuerId, newShelteredAnimal.id, publicationDescription);

      await this.publicationCommandRepository.save(newPub);
    }
  }
}
