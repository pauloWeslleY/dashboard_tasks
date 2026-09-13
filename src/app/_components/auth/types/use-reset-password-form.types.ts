import { type authClient } from '@/main/lib/auth/client';
import { type z } from 'zod';

import { type ResetPasswordSchema } from '../schema/reset-password.schema';

export type ResetPasswordFormType = z.infer<
  typeof ResetPasswordSchema
>;

export interface UseResetPasswordFormProps {
  authClient: typeof authClient;
}
