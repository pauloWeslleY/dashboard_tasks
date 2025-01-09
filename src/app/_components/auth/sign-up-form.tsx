'use client';

import React from 'react';
import RouterLink from 'next/link';
import { paths } from '@/main/paths';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller } from 'react-hook-form';

import { InputField, InputPassword } from '../ui';
import { useSignUpForm } from './hooks';
import { AuthLoading } from './loading';

export function SignUpForm(): React.JSX.Element {
  const { errors, isError, control, isLoading, errorMessage, handleSubmit, handlerSignUpOnSubmit } = useSignUpForm();

  return (
    <Stack spacing={3}>
      <AuthLoading open={isLoading} message="Autenticando..." />

      <Stack spacing={1}>
        <Typography variant="h4">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
            Sign in
          </Link>
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(handlerSignUpOnSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  label="Nome"
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  label="Sobrenome"
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="username"
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  label="Username"
                  error={Boolean(errors.username)}
                  helperText={errors.username?.message}
                />
              );
            }}
          />
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
                  helperText={errors.password?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      I have read the <Link>terms and conditions</Link>
                    </React.Fragment>
                  }
                />
                {errors.terms && (
                  <FormHelperText error sx={{ fontSize: (theme) => theme.typography.pxToRem(14) }}>
                    {errors.terms.message}
                  </FormHelperText>
                )}
              </div>
            )}
          />

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
            Sign up
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
