import { AggregateRoot } from '@src/core/domain/aggregate-root';
import { AnimalName } from './animal-name';
import { AnimalTypeEnum } from './animal-type-enum';
import { AnimalStatusEnum } from './animal-status-enum';
import { AnimalWeigth } from './animal-weigth';
import { AnimalSizeEnum } from './animal-size-enum';
import { AnimalAge } from './animal-age';

export interface AnimalProps {
  rescuerId: string;
  name: AnimalName;
  type: AnimalTypeEnum;
  status: AnimalStatusEnum;
  lastWeigth: AnimalWeigth;
  size: AnimalSizeEnum;
  ageInMonths: AnimalAge;
  registeredIn: Date;
  shelteredIn: Date;
}

export class Animal extends AggregateRoot<AnimalProps> {
  get name(): string {
    return this.props.name.getValue();
  }

  public static createFromPrimitive(
    props: {
      creatorId: string;
      verified: boolean;
      createdAt: Date;
      deactivatedAt?: string;
      disabledAt?: string;
      editedAt?: string;
    },
    id?: string,
  ): Animal {
    return new Animal(
      {
        creatorId: props.creatorId,
        verified: props.verified,
        createdAt: props.createdAt,
      },
      id,
    );
  }
}
