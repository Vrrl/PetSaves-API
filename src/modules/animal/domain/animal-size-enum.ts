import { z } from 'zod';

const AnimalSizeEnum = z.enum(['small', 'medium', 'big']);

export type AnimalSizeEnum = z.infer<typeof AnimalSizeEnum>;
