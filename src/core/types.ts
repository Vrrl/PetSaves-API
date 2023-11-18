const TYPES = {
  // Resources
  DynamoDBClient: Symbol.for('DynamoDBClient'),
  CognitoIdentityProvider: Symbol.for('CognitoIdentityProvider'),
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  // Repos
  IAnimalCommandRepository: Symbol.for('IAnimalCommandRepository'),
  IAnimalQueryRepository: Symbol.for('IAnimalQueryRepository'),
  IAdoptionCommandRepository: Symbol.for('IAdoptionCommandRepository'),
  IAdoptionQueryRepository: Symbol.for('IAdoptionQueryRepository'),
  IPublicationCommandRepository: Symbol.for('IPublicationCommandRepository'),
  IPublicationQueryRepository: Symbol.for('IPublicationQueryRepository'),
  // UseCases
  SignUpUseCase: Symbol.for('SignUpUseCase'),
  SignUpConfirmUseCase: Symbol.for('SignUpConfirmUseCase'),
  SignUpResendVerificationCodeUseCase: Symbol.for('SignUpResendVerificationCodeUseCase'),
  LogInUseCase: Symbol.for('LogInUseCase'),
  ShelteredAnimalRegistrationUseCase: Symbol.for('ShelteredAnimalRegistrationUseCase'),
  LostAnimalReportUseCase: Symbol.for('LostAnimalReportUseCase'),
  LostAnimalClaimUseCase: Symbol.for('LostAnimalClaimUseCase'),
  AnimalListUseCase: Symbol.for('AnimalListUseCase'),
  ShelteredAnimalRequestAdoptionUseCase: Symbol.for('ShelteredAnimalRequestAdoptionUseCase'),
  AnimalFeedUseCase: Symbol.for('AnimalFeedUseCase'),
};

export default TYPES;
