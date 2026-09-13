import { useCallback, useState } from 'react';
import { type authClient } from '@/main/lib/auth/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ResetPasswordSchema } from '../schema/reset-password.schema';
import { type ResetPasswordFormType } from '../types/use-reset-password-form.types';

export function useResetPasswordForm(auth: typeof authClient) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordFormType>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const handlerResetPasswordOnSubmit = useCallback(
    async (values: ResetPasswordFormType): Promise<void> => {
      setIsPending(true);

      const { error } = await auth.resetPassword(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      setIsPending(false);
    },
    [setError, auth]
  );

  return {
    errors,
    control,
    isPending,
    handleSubmit,
    handlerResetPasswordOnSubmit,
  };
}
