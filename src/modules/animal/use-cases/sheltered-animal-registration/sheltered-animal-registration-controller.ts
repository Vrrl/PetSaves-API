import { inject, injectable } from 'inversify';
import { z } from 'zod';
import { created } from '@src/core/infra/helpers/http-status';
import { HttpRequest, HttpResponse } from '@core/infra/http';
import { Controller, ControllerContext } from '@core/infra/controller';
import TYPES from '@src/core/types';
import { AuthenticationLevel } from '@src/core/infra/authentication/authentication-level';
import { User } from '@src/modules/authentication/domain/user';
import { ShelteredAnimalRegistrationUseCase } from './sheltered-animal-registration';

@injectable()
export class ShelteredAnimalRegistrationController extends Controller {
  constructor(
    @inject(TYPES.ShelteredAnimalRegistrationUseCase)
    private readonly shelteredAnimalRegistrationUseCase: ShelteredAnimalRegistrationUseCase,
  ) {
    super();
  }

  authenticationLevels: AuthenticationLevel[] = [AuthenticationLevel.basicUser];

  get requestSchema(): z.AnyZodObject {
    return z.object({
      body: z.object({
        title: z.string().min(3).max(70),
      }),
    });
  }

  async perform(httpRequest: HttpRequest, context: ControllerContext): Promise<HttpResponse> {
    const { title, description, tags } = httpRequest.body;

    const user = context.user as User;

    await this.shelteredAnimalRegistrationUseCase.execute({
      title,
      description,
      tags,
      creatorId: user.id,
    });

    return created();
  }
}
