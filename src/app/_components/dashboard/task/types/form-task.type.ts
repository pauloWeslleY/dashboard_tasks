import { type z } from 'zod';

import { type TaskSchema } from '../schemas';

export type FormTaskType = z.infer<typeof TaskSchema>;
