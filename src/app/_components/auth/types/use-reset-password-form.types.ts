import { type authClient } from '@/main/lib/auth/client';
import { type Control, type FieldErrors, type UseFormHandleSubmit } from 'react-hook-form';
import { type z as zod } from 'zod';

import { type ResetPasswordSchema } from '../schema/reset-password.schema';

export type ResetPasswordFormType = zod.infer<typeof ResetPasswordSchema>;

export interface UseResetPasswordFormProps {
  authClient: typeof authClient;
}

export interface UseResetPasswordFormType {
  isPending: boolean;
  control: Control<ResetPasswordFormType>;
  errors: FieldErrors<ResetPasswordFormType>;
  handleSubmit: UseFormHandleSubmit<ResetPasswordFormType>;
  handlerResetPasswordOnSubmit: (values: ResetPasswordFormType) => Promise<void>;
}
