import { type z } from 'zod';

import { type SignInSchema } from '../schema/sign-in.schema';

export type SignInFormType = z.infer<typeof SignInSchema>;
