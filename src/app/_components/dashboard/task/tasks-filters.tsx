'use client';

import React from 'react';
import { loadCategoryOptions } from '@/app/database/category-options';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import { SelectField } from '../../ui';
import { useTaskFilter } from './hooks';

export function TasksFilters(): React.JSX.Element {
  const {
    taskStatus,
    taskCategory,
    taskDescription,
    loadSelectTaskStatus,
    handlerChangeInputTaskFilterStatus,
    handlerChangeInputTaskFilterCategory,
    handlerChangeInputTaskFilterDescription,
  } = useTaskFilter();

  return (
    <Card sx={{ padding: 2 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'center' }}
      >
        <OutlinedInput
          placeholder="Pesquisar tarefas"
          fullWidth
          size="small"
          value={taskDescription}
          onChange={handlerChangeInputTaskFilterDescription}
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
        />

        <SelectField
          id="category"
          label="Categoria da tarefa"
          placeholder="Selecione a categoria da tarefa"
          value={taskCategory}
          onChange={handlerChangeInputTaskFilterCategory}
          options={loadCategoryOptions}
          sx={{ minWidth: '300px' }}
        />

        <SelectField
          id="taskStatus"
          label="Status da tarefa"
          placeholder="Selecione o status da tarefa"
          value={taskStatus}
          onChange={handlerChangeInputTaskFilterStatus}
          options={loadSelectTaskStatus}
          sx={{ minWidth: '300px' }}
        />
      </Stack>
    </Card>
  );
}
