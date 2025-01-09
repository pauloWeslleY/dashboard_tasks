import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useError } from '@/app/hooks/use-error';
import { loadAddAccount } from '@/main/store/ducks/add-account';
import { type AddAccountType } from '@/main/store/ducks/add-account/types/add-account.type';
import { useStateAuth } from '@/main/store/ducks/authentication';
import { useAppDispatch, useAppSelector } from '@/main/store/hooks/use-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { SignUpSchema } from '../schema/sign-up.schema';
import { type SignUpFormType, type UseSignUpFormType } from '../types/use-sign-up-form.type';

export function useSignUpForm(): UseSignUpFormType {
  const { isLoading, error, isError } = useAppSelector(useStateAuth);
  const { errorMessage } = useError(error);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      terms: false,
    },
  });

  function formattedDataSignUp(data: SignUpFormType): AddAccountType {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      username: data.username,
    };
  }

  const handlerSignUpOnSubmit = useCallback(
    (data: SignUpFormType): void => {
      const formatDataSignUp = formattedDataSignUp(data);
      dispatch(loadAddAccount(formatDataSignUp));
      router.refresh();
    },
    [dispatch, router]
  );

  return {
    errors,
    isError,
    control,
    isLoading,
    errorMessage,
    handleSubmit,
    handlerSignUpOnSubmit,
  };
}
