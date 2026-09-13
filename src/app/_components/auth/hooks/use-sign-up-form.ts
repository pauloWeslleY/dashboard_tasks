import { authClient } from '@/infra/auth/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { SignUpSchema } from '../schema/sign-up.schema';
import { type SignUpFormType } from '../types/use-sign-up-form.type';

export function useSignUpForm() {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      terms: false,
    },
  });

  const handlerSignUpOnSubmit = async (data: SignUpFormType) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.username,
      },
      {
        onSuccess: (response) => {
          console.log('Sign up successful:', response.data);
        },
        onError: (error) => {
          setError('root', {
            type: 'manual',
            message: error.error.message,
          });
        },
      }
    );
  };

  return {
    errors,
    control,
    isSubmitting,
    handleSubmit,
    handlerSignUpOnSubmit,
  };
}
