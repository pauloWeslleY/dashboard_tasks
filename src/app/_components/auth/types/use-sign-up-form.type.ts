import { type Control, type FieldErrors, type UseFormHandleSubmit } from 'react-hook-form';
import { type z } from 'zod';

import { type SignUpSchema } from '../schema/sign-up.schema';

export type SignUpFormType = z.infer<typeof SignUpSchema>;

export interface UseSignUpFormType {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  control: Control<SignUpFormType>;
  errors: FieldErrors<SignUpFormType>;
  handleSubmit: UseFormHandleSubmit<SignUpFormType>;
  handlerSignUpOnSubmit(values: SignUpFormType): void;
}
