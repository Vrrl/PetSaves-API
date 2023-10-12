import { z } from 'zod';

const AnimalTypeEnum = z.enum(['cat', 'dog']);

export type AnimalTypeEnum = z.infer<typeof AnimalTypeEnum>;
