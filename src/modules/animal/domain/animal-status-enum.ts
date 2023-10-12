import { z } from 'zod';

const AnimalStatusEnum = z.enum(['lost', 'sheltered']);

export type AnimalStatusEnum = z.infer<typeof AnimalStatusEnum>;
