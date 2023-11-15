import container from '@core/injector';
import { Router } from '@core/infra/router';
import { ShelteredAnimalRegistrationController } from './use-cases/sheltered-animal-registration/sheltered-animal-registration-controller';
import { LostAnimalReportController } from './use-cases/lost-animal-report/lost-animal-report-controller';

const v1router = new Router('v1/animal');

// v1router.post('/sheltered/registration', container.resolve(ShelteredAnimalRegistrationController));
v1router.post('/lost/report', container.resolve(LostAnimalReportController));

export { v1router };
