'use client';

import React from 'react';
import { InputField, SelectField } from '@/app/_components/ui';
import { loadCategoryOptions } from '@/app/database/category-options';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PlusCircle as PlusCircleIcon } from '@phosphor-icons/react/dist/ssr/PlusCircle';
import { Controller } from 'react-hook-form';

import { useFormCreateTask } from './hooks/use-form-create-task';

const sizePlusIcon = 24;

export function DialogCreateTaskForm() {
  const {
    openModalCreateTask,
    control,
    errors,
    handlerCreateTask,
    handleOpenModalCreateTask,
    handleCloseModalCreateTask,
    onCloseModalFormCreateTask,
    isSubmitting,
  } = useFormCreateTask();

  return (
    <React.Fragment>
      <Button
        onClick={handleOpenModalCreateTask}
        startIcon={
          <Box
            component={PlusCircleIcon}
            sx={{ width: sizePlusIcon, height: sizePlusIcon }}
          />
        }
        variant="contained"
      >
        Adicionar
      </Button>

      <Dialog
        open={openModalCreateTask}
        onClose={onCloseModalFormCreateTask}
        aria-labelledby="task-dialog-title"
        aria-describedby="task-dialog-description"
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiModal-backdrop': {
            backdropFilter: 'blur(5px)',
            background: 'rgba(255, 255, 255, 0.2)',
          },
          '& .MuiPaper-root': {
            position: 'relative',
          },
        }}
      >
        <Backdrop
          open={isSubmitting}
          sx={(theme) => ({
            color: theme.palette.common.white,
            zIndex: theme.zIndex.drawer + 1,
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          })}
        >
          <CircularProgress color="primary" size={65} />
        </Backdrop>

        <Typography
          id="task-dialog-title"
          component={DialogTitle}
          variant="h5"
          sx={{ color: 'primary.dark' }}
        >
          Cadastrar Tarefa
        </Typography>

        <DialogContent>
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
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleCloseModalCreateTask}
            disabled={isSubmitting}
            color="error"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={handlerCreateTask}
            disabled={isSubmitting}
            variant="contained"
            sx={{ display: 'flex', alignItem: 'center', gap: 1 }}
          >
            {isSubmitting && (
              <CircularProgress
                size="20px"
                sx={{
                  color: isSubmitting
                    ? 'primary.light'
                    : 'common.white',
                }}
              />
            )}

            {isSubmitting ? 'Criando...' : 'Criar Tarefa'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
