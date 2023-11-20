import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { IUseCase } from '@src/core/use-case';
import { Animal } from '../../domain/animal';
import { AnimalTypeEnum } from '../../domain/animal-type-enum';
import { AnimalSizeEnum } from '../../domain/animal-size-enum';
import { IAnimalCommandRepository } from '../../infra/repositories/animal-command-repository';
import { Publication } from '../../domain/publication';
import { IPublicationCommandRepository } from '../../infra/repositories/publication-command-repository';

interface LostAnimalReportRequest {
  rescuerId: string;
  type: AnimalTypeEnum;
  size: AnimalSizeEnum;
  ageInMonths: number;
  lastWeigth?: number;
  shelteredIn?: number;
  imageUrl: string;
  lastLocation: string;
  publicationDescription?: string;
  createPublication: boolean;
}

type LostAnimalReportResponse = void;

@injectable()
export class LostAnimalReportUseCase implements IUseCase<LostAnimalReportRequest, LostAnimalReportResponse> {
  constructor(
    @inject(TYPES.IAnimalCommandRepository) private readonly animalCommandRepository: IAnimalCommandRepository,
    @inject(TYPES.IPublicationCommandRepository)
    private readonly publicationCommandRepository: IPublicationCommandRepository,
  ) {}

  async execute({
    rescuerId,
    type,
    size,
    ageInMonths,
    lastWeigth,
    imageUrl,
    lastLocation,
    publicationDescription,
    createPublication,
  }: LostAnimalReportRequest): Promise<LostAnimalReportResponse> {
    const newLostAnimal = Animal.createLost({
      rescuerId,
      type,
      size,
      ageInMonths,
      lastWeigth,
      imageUrl,
      lastLocation,
    });

    await this.animalCommandRepository.save(newLostAnimal);

    if (createPublication) {
      const newPub = Publication.newPublication(rescuerId, newLostAnimal.id, publicationDescription);

      await this.publicationCommandRepository.save(newPub);
    }
  }
}
