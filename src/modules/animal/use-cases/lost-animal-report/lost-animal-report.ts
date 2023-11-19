import TYPES from '@src/core/types';
import { inject, injectable } from 'inversify';
import { IUseCase } from '@src/core/use-case';
import { Animal } from '../../domain/animal';
import { AnimalTypeEnum } from '../../domain/animal-type-enum';
import { AnimalSizeEnum } from '../../domain/animal-size-enum';
import { IAnimalCommandRepository } from '../../infra/repositories/animal-command-repository';

interface LostAnimalReportRequest {
  rescuerId: string;
  name: string;
  type: AnimalTypeEnum;
  size: AnimalSizeEnum;
  ageInMonths: number;
  lastWeigth?: number;
  shelteredIn?: number;
  imageUrl: string;
}

type LostAnimalReportResponse = void;

@injectable()
export class LostAnimalReportUseCase implements IUseCase<LostAnimalReportRequest, LostAnimalReportResponse> {
  constructor(
    @inject(TYPES.IAnimalCommandRepository) private readonly animalCommandRepository: IAnimalCommandRepository,
  ) {}

  async execute({
    rescuerId,
    name,
    type,
    size,
    ageInMonths,
    lastWeigth,
    imageUrl,
  }: LostAnimalReportRequest): Promise<LostAnimalReportResponse> {
    const newLostAnimal = Animal.createLost({
      rescuerId,
      name,
      type,
      size,
      ageInMonths,
      lastWeigth,
      imageUrl,
    });

    await this.animalCommandRepository.save(newLostAnimal);
  }
}
