import { AggregateRoot } from '@src/core/domain/aggregate-root';
import { AnimalName } from './animal-name';
import { AnimalTypeEnum } from './animal-type-enum';
import { AnimalStatusEnum } from './animal-status-enum';
import { AnimalWeigth } from './animal-weigth';
import { AnimalSizeEnum } from './animal-size-enum';
import { AnimalAge } from './animal-age';
import moment from 'moment';
import { UseCaseError } from '@src/core/errors';

export interface AnimalProps {
  rescuerId: string;
  name: AnimalName;
  type: AnimalTypeEnum;
  status: AnimalStatusEnum;
  lastWeigth?: AnimalWeigth;
  size: AnimalSizeEnum;
  age: AnimalAge;
  registeredAt: number;
  shelteredAt?: number;
}

export class Animal extends AggregateRoot<AnimalProps> {
  claim(rescuerId: string) {
    if (this.props.status === 'sheltered') throw new UseCaseError('Cannot claim sheltered animals');
    if (!rescuerId) throw new UseCaseError('Cannot claim animal without rescuerId');

    this.props.status = 'sheltered';
    this.props.rescuerId = rescuerId;
  }

  static createFromPrimitive(
    props: {
      rescuerId: string;
      name?: string;
      type: AnimalTypeEnum;
      size: AnimalSizeEnum;
      status: AnimalStatusEnum;
      ageInMonths?: number;
      registeredAt: number;
      lastWeigth?: number;
      shelteredAt?: number;
    },
    id?: string,
  ) {
    return new Animal(
      {
        rescuerId: props.rescuerId,
        name: AnimalName.create({ name: props.name }),
        type: props.type,
        status: props.status,
        lastWeigth: AnimalWeigth.create({ weigth: props.lastWeigth }),
        size: props.size,
        age: AnimalAge.create({ ageInMonths: props.ageInMonths }),
        registeredAt: props.registeredAt,
        shelteredAt: props.shelteredAt,
      },
      id,
    );
  }

  public static createSheltered(
    props: {
      rescuerId: string;
      name: string;
      type: AnimalTypeEnum;
      size: AnimalSizeEnum;
      ageInMonths: number;
      lastWeigth?: number;
      shelteredAt?: number;
    },
    id?: string,
  ): Animal {
    return Animal.createFromPrimitive(
      {
        ...props,
        status: 'sheltered',
        registeredAt: moment().unix(),
        shelteredAt: props.shelteredAt ?? moment().unix(),
      },
      id,
    );
  }

  public static createLost(
    props: {
      rescuerId: string;
      name?: string;
      type: AnimalTypeEnum;
      size: AnimalSizeEnum;
      ageInMonths?: number;
      lastWeigth?: number;
    },
    id?: string,
  ): Animal {
    return Animal.createFromPrimitive(
      {
        ...props,
        status: 'lost',
        registeredAt: moment().unix(),
      },
      id,
    );
  }

  public toJson(): object {
    return {
      id: this.id,
      rescuerId: this.props.rescuerId,
      name: this.props.name.value,
      type: this.props.type,
      size: this.props.size,
      status: this.props.status,
      ageInMonths: this.props.age.getMonths,
      registeredAt: this.props.registeredAt,
      lastWeigth: this.props.lastWeigth?.value,
      shelteredAt: this.props.shelteredAt,
    };
  }
}
