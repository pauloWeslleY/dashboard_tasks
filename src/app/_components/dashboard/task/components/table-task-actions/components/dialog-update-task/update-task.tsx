import React from 'react';
import { type FormTaskType } from '@/app/_components/dashboard/task/types';
import { InputField, SelectField } from '@/app/_components/ui';
import { loadCategoryOptions } from '@/app/database/category-options';
import Stack from '@mui/material/Stack';
import {
  Controller,
  type Control,
  type FieldErrors,
} from 'react-hook-form';

interface UpdateTaskProps {
  control: Control<FormTaskType>;
  errors: FieldErrors<FormTaskType>;
}

export function UpdateTask({ control, errors }: UpdateTaskProps) {
  return (
    <Stack spacing={2} sx={{ padding: 1 }}>
      <Controller
        name="nameTask"
        control={control}
        render={({ field }) => {
          return (
            <InputField
              {...field}
              label="Nome da tarefa"
              placeholder="Digite o nome da tarefa"
              error={Boolean(errors.nameTask)}
              helperText={errors.nameTask?.message}
            />
          );
        }}
      />
      <Controller
        name="descriptionTask"
        control={control}
        render={({ field }) => {
          return (
            <InputField
              {...field}
              label="Descrição da tarefa"
              placeholder="Digite a descrição da tarefa"
              error={Boolean(errors.descriptionTask)}
              helperText={errors.descriptionTask?.message}
            />
          );
        }}
      />
      <Controller
        name="categoryTask"
        control={control}
        render={({ field }) => {
          return (
            <SelectField
              {...field}
              id="category"
              label="Categoria da tarefa"
              placeholder="Selecione a categoria da tarefa"
              options={loadCategoryOptions}
              error={Boolean(errors.categoryTask)}
              helperText={errors.categoryTask?.message}
            />
          );
        }}
      />
    </Stack>
  );
}
