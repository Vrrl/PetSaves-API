import container from '@core/injector';
import { Router } from '@core/infra/router';
import { ShelteredAnimalRegistrationController } from './use-cases/sheltered-animal-registration/sheltered-animal-registration-controller';
import { LostAnimalReportController } from './use-cases/lost-animal-report/lost-animal-report-controller';
import { LostAnimalClaimController } from './use-cases/lost-animal-claim/lost-animal-claim-controller';

const v1router = new Router('v1/animal');

v1router.post('/sheltered/registration', container.resolve(ShelteredAnimalRegistrationController));
v1router.post('/lost/report', container.resolve(LostAnimalReportController));
v1router.post('/lost/claim/{id}', container.resolve(LostAnimalClaimController));

export { v1router };
