import { z } from 'zod';

export const AnimalStatusEnum = z.enum(['lost', 'sheltered']);

export type AnimalStatusEnum = z.infer<typeof AnimalStatusEnum>;
