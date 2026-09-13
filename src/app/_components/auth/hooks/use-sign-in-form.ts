import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/infra/auth/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { SignInSchema } from '../schema/sign-in.schema';
import { type SignInFormType } from '../types/use-sign-in-form.types';

export function useSignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: 'test@gmail.com',
      password: '123456',
    },
  });

  const handlerSignInOnSubmit = async (values: SignInFormType) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (response) => {
          console.log('Sign in successful:', response.data);
          router.refresh();
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
    showPassword,
    setShowPassword,
    handleSubmit,
    handlerSignInOnSubmit,
  };
}
