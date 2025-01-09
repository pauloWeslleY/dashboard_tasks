'use client';

import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';

import { InputField, SelectField } from '../../ui';
import { useAccountInfo, useFormUserUpdate } from './hooks';
import { states } from './states';

export function AccountDetailsForm(): React.JSX.Element {
  const { control, errors, handleSubmit, handlerUserUpdate } = useFormUserUpdate();
  const { isPendingUserUpdate } = useAccountInfo();

  return (
    <form onSubmit={handleSubmit(handlerUserUpdate)}>
      <Backdrop
        open={isPendingUserUpdate}
        sx={(theme) => ({
          color: theme.palette.common.white,
          zIndex: theme.zIndex.drawer + 2,
          backdropFilter: 'blur(3px)',
        })}
      >
        <Stack
          component={Paper}
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            paddingX: 1.5,
            paddingY: 1,
            borderRadius: 2,
            background: (theme) => theme.palette.neutral[800],
          }}
        >
          <CircularProgress size={65} sx={{ color: 'primary.light' }} />
          <Typography variant="h3" color="primary.light">
            Loading...
          </Typography>
        </Stack>
      </Backdrop>

      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />

        <Divider />

        <CardContent>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => {
                return (
                  <InputField
                    {...field}
                    id="firstName"
                    label="Nome"
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
                  />
                );
              }}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => {
                return (
                  <InputField
                    {...field}
                    id="lastName"
                    label="Sobrenome"
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
                  />
                );
              }}
            />
            <Controller
              name="username"
              control={control}
              render={({ field }) => {
                return (
                  <InputField
                    {...field}
                    id="username"
                    label="Username"
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message}
                  />
                );
              }}
            />
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => {
                const { ref, name, onChange } = field;
                return (
                  <DatePicker
                    ref={ref}
                    name={name}
                    label="Data de Nascimento"
                    onChange={(date) => {
                      const dateOfBirth = dayjs(date).format('YYYY-MM-DD');
                      onChange(dateOfBirth);
                    }}
                    slots={{ textField: TextField }}
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        size: 'small',
                        error: Boolean(errors.dateOfBirth?.message),
                        helperText: errors.dateOfBirth?.message,
                      },
                    }}
                  />
                );
              }}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => {
                return (
                  <InputField
                    {...field}
                    id="phone"
                    label="Telefone"
                    type="tel"
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
                  />
                );
              }}
            />
            <Controller
              name="address.state"
              control={control}
              render={({ field }) => {
                return (
                  <SelectField
                    {...field}
                    id="state"
                    label="Estado"
                    placeholder="selecione um estado"
                    options={states}
                    error={Boolean(errors.address?.state)}
                    helperText={errors.address?.state?.message}
                  />
                );
              }}
            />
            <Controller
              name="address.city"
              control={control}
              render={({ field }) => {
                return (
                  <InputField
                    {...field}
                    id="city"
                    label="Cidade"
                    error={Boolean(errors.address?.city)}
                    helperText={errors.address?.city?.message}
                  />
                );
              }}
            />
          </Box>
        </CardContent>

        <Divider />

        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
