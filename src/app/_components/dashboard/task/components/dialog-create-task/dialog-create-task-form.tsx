'use client';

import React from 'react';
import { InputField, SelectField } from '@/app/_components/ui';
import { loadCategoryOptions } from '@/app/database/category-options';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
    isPendingCreateTask,
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
          open={isPendingCreateTask}
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

        <DialogContent sx={{ paddingInline: 2 }}>
          <Box
            sx={{
              paddingY: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <InputField
                    {...field}
                    label="Nome da tarefa"
                    placeholder="Digite o nome da tarefa"
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                  />
                );
              }}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => {
                return (
                  <InputField
                    {...field}
                    label="Descrição da tarefa"
                    placeholder="Digite a descrição da tarefa"
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                  />
                );
              }}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => {
                return (
                  <SelectField
                    {...field}
                    id="category"
                    label="Categoria da tarefa"
                    placeholder="Selecione a categoria da tarefa"
                    options={loadCategoryOptions}
                    error={Boolean(errors.category)}
                    helperText={errors.category?.message}
                  />
                );
              }}
            />
          </Box>

          <Collapse
            in={Boolean(errors.root)}
            timeout="auto"
            unmountOnExit
          >
            <Alert severity="error">{errors.root?.message}</Alert>
          </Collapse>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleCloseModalCreateTask}
            disabled={isPendingCreateTask}
            color="error"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={handlerCreateTask}
            disabled={isPendingCreateTask}
            variant="contained"
            sx={{ display: 'flex', alignItem: 'center', gap: 1 }}
          >
            {isPendingCreateTask && (
              <CircularProgress
                size="20px"
                sx={{
                  color: isPendingCreateTask
                    ? 'primary.light'
                    : 'common.white',
                }}
              />
            )}

            {isPendingCreateTask ? 'Criando...' : 'Criar Tarefa'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
