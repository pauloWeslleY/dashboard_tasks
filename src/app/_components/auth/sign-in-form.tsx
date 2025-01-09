'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { paths } from '@/main/paths';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller } from 'react-hook-form';

import { InputField, InputPassword } from '../ui';
import { useSignInForm } from './hooks';
import { AuthLoading } from './loading';

export function SignInForm(): React.JSX.Element {
  const { errors, isError, control, isLoading, errorMessage, handleSubmit, handlerSignInOnSubmit } = useSignInForm();

  return (
    <Stack spacing={4}>
      <AuthLoading open={isLoading} message="Autenticando..." />

      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>

        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
            Sign up
          </Link>
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(handlerSignInOnSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  label="E-mail"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => {
              return (
                <InputPassword
                  {...field}
                  id="password"
                  label="Senha"
                  error={Boolean(errors.password)}
                  helperText={errors.email?.message}
                />
              );
            }}
          />

          <div>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>

          {errors.root && (
            <Alert severity="error" color="error">
              {errors.root.message}
            </Alert>
          )}

          {isError && (
            <Alert severity="error" color="error">
              {errorMessage}
            </Alert>
          )}

          <Button disabled={isLoading} type="submit" variant="contained">
            Sign in
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
