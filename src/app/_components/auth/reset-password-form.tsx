'use client';

import React from 'react';
import { InputField } from '@/app/_components/ui';
import { authClient } from '@/main/lib/auth/client';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller } from 'react-hook-form';

import { useResetPasswordForm } from './hooks';

export function ResetPasswordForm(): React.JSX.Element {
  const { control, errors, isPending, handleSubmit, handlerResetPasswordOnSubmit } = useResetPasswordForm({
    authClient,
  });

  return (
    <Stack spacing={4}>
      <Typography variant="h5">Reset password</Typography>

      <form onSubmit={handleSubmit(handlerResetPasswordOnSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  label="Email address"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              );
            }}
          />

          {errors.root && <Alert color="error">{errors.root.message}</Alert>}

          <Button disabled={isPending} type="submit" variant="contained">
            Send recovery link
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
