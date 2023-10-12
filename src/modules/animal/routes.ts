import container from '@core/injector';
import { Router } from '@core/infra/router';
import { ShelteredAnimalRegistrationController } from './use-cases/sheltered-animal-registration/sheltered-animal-registration-controller';

const v1router = new Router('v1/animal');

v1router.post('/sheltered/registration', container.resolve(ShelteredAnimalRegistrationController));

export { v1router };
