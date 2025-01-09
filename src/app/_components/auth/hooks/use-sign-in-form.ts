import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useError } from '@/app/hooks/use-error';
import { loadAuthentication, useStateAuth } from '@/main/store/ducks/authentication';
import { useAppDispatch, useAppSelector } from '@/main/store/hooks/use-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { type IAuthenticationDTO } from '@/data/usecases';

import { SignInSchema } from '../schema/sign-in.schema';
import { type SignInFormType, type UseSignInFormType } from '../types';

export function useSignInForm(): UseSignInFormType {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { isLoading, error, isError } = useAppSelector(useStateAuth);
  const { errorMessage } = useError(error);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<SignInFormType>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: 'test@gmail.com',
      password: '123456',
    },
  });
  const { errors } = formState;

  function formatDataSignIn(data: IAuthenticationDTO): IAuthenticationDTO {
    return {
      email: data.email,
      password: data.password,
    };
  }

  const handlerSignInOnSubmit = useCallback(
    async (values: SignInFormType): Promise<void> => {
      const formattedDataSignIn = formatDataSignIn(values);
      dispatch(loadAuthentication(formattedDataSignIn));
      router.refresh();
    },
    [dispatch, router]
  );

  return {
    errorMessage,
    isError,
    errors,
    control,
    isLoading,
    showPassword,
    setShowPassword,
    handleSubmit,
    handlerSignInOnSubmit,
  };
}
