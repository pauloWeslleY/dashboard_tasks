import { type Control, type FieldErrors, type UseFormHandleSubmit } from 'react-hook-form';
import { type z as zod } from 'zod';

import { type SignInSchema } from '../schema/sign-in.schema';

export type SignInFormType = zod.infer<typeof SignInSchema>;

export interface UseSignInFormType {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  showPassword: boolean | undefined;
  control: Control<SignInFormType>;
  errors: FieldErrors<SignInFormType>;
  setShowPassword: (value: boolean) => void;
  handleSubmit: UseFormHandleSubmit<SignInFormType>;
  handlerSignInOnSubmit: (values: SignInFormType) => Promise<void>;
}
