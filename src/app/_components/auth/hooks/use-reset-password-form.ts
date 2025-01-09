import { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ResetPasswordSchema } from '../schema/reset-password.schema';
import {
  type ResetPasswordFormType,
  type UseResetPasswordFormProps,
  type UseResetPasswordFormType,
} from '../types/use-reset-password-form.types';

export function useResetPasswordForm({ authClient }: UseResetPasswordFormProps): UseResetPasswordFormType {
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

      const { error } = await authClient.resetPassword(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      setIsPending(false);
    },
    [setError, authClient]
  );

  return {
    errors,
    control,
    isPending,
    handleSubmit,
    handlerResetPasswordOnSubmit,
  };
}
