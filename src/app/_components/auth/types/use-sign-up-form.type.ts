import { type z } from 'zod';

import { type SignUpSchema } from '../schema/sign-up.schema';

export type SignUpFormType = z.infer<typeof SignUpSchema>;
