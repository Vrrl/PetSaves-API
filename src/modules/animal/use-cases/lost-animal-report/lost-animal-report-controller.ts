import { inject, injectable } from 'inversify';
import { z } from 'zod';
import { created } from '@src/core/infra/helpers/http-status';
import { HttpRequest, HttpResponse } from '@core/infra/http';
import { Controller, ControllerContext } from '@core/infra/controller';
import TYPES from '@src/core/types';
import { AuthenticationLevel } from '@src/core/infra/authentication/authentication-level';
import { User } from '@src/modules/authentication/domain/user';
import { LostAnimalReportUseCase } from './lost-animal-report';
import { AnimalTypeEnum } from '../../domain/animal-type-enum';
import { AnimalSizeEnum } from '../../domain/animal-size-enum';

@injectable()
export class LostAnimalReportController extends Controller {
  constructor(
    @inject(TYPES.ShelteredAnimalRegistrationUseCase)
    private readonly lostAnimalReportUseCase: LostAnimalReportUseCase,
  ) {
    super();
  }

  authenticationLevels: AuthenticationLevel[] = [AuthenticationLevel.basicUser];

  get requestSchema(): z.AnyZodObject {
    return z.object({
      body: z.object({
        name: z.string().min(3).max(70).optional(),
        type: AnimalTypeEnum,
        size: AnimalSizeEnum,
        ageInMonths: z.number().optional(),
        lastWeigth: z.number().optional(),
      }),
    });
  }

  async perform(httpRequest: HttpRequest, context: ControllerContext): Promise<HttpResponse> {
    const { name, type, size, ageInMonths, lastWeigth } = httpRequest.body;

    const user = context.user as User;
    debugger;
    await this.lostAnimalReportUseCase.execute({
      rescuerId: user.id,
      name,
      type,
      size,
      ageInMonths,
      lastWeigth,
    });

    return created();
  }
}
