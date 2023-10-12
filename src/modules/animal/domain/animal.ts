import { AggregateRoot } from '@src/core/domain/aggregate-root';

export interface AnimalProps {
  creatorId: string;
  verified: boolean;
  createdAt: Date;
  editedAt?: Date;
  deactivatedAt?: Date;
  disabledAt?: Date;
}

export class Animal extends AggregateRoot<AnimalProps> {
  get verified(): boolean {
    return this.props.verified;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get editedAt(): Date | undefined {
    return this.props.editedAt;
  }
  get deactivatedAt(): Date | undefined {
    return this.props.deactivatedAt;
  }
  get disabledAt(): Date | undefined {
    return this.props.disabledAt;
  }
  get creatorId(): string {
    return this.props.creatorId;
  }

  disable(): void {
    this.props.disabledAt = new Date();
  }

  enable(): void {
    this.props.disabledAt = undefined;
  }

  deactivate(): void {
    this.props.deactivatedAt = new Date();
  }

  activate(): void {
    this.props.deactivatedAt = undefined;
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
