import { type z } from 'zod';

import { type UserUpdateSchema } from '../schemas';

export type FormUserUpdateType = z.infer<typeof UserUpdateSchema>;
