'use client';

import React from 'react';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';

import { useFormUpdateTask } from './hooks/use-form-update-task';
import { UpdateTask } from './update-task';

export function DialogUpdateTask() {
  const {
    taskId,
    control,
    errors,
    isSubmitting,
    loadTitleButtonUpdateTask,
    colorIconCircleProgress,
    onCloseDialogFormUpdateTask,
    openDialogUpdateTask,
    handlerUpdateTask,
    handlerOpenDialogUpdateTask,
    handlerCloseDialogUpdateTask,
  } = useFormUpdateTask();

  return (
    <React.Fragment>
      <Stack
        direction="row"
        spacing={1.5}
        component={MenuItem}
        disableRipple
        onClick={handlerOpenDialogUpdateTask}
      >
        <Box component={PencilSimpleIcon} />
        Editar
      </Stack>

      <Dialog
        open={openDialogUpdateTask}
        onClose={onCloseDialogFormUpdateTask}
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
          sx={(theme) => ({
            color: theme.palette.common.white,
            zIndex: theme.zIndex.drawer + 1,
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          })}
          open={isSubmitting}
        >
          <CircularProgress color="primary" size={65} />
        </Backdrop>

        <Typography
          id="task-dialog-title"
          component={DialogTitle}
          variant="h5"
          sx={{ color: 'primary.dark' }}
        >
          Editar Tarefa{' '}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block' }}
          >
            ID: {taskId}
          </Typography>
        </Typography>

        <DialogContent>
          <UpdateTask control={control} errors={errors} />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handlerCloseDialogUpdateTask}
            disabled={isSubmitting}
            color="error"
            variant="outlined"
          >
            Cancelar
          </Button>

          <Button
            onClick={handlerUpdateTask}
            variant="contained"
            disabled={isSubmitting}
            startIcon={
              isSubmitting && (
                <CircularProgress
                  size="20px"
                  sx={{ color: colorIconCircleProgress }}
                />
              )
            }
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              width: isSubmitting ? 'max-content' : 120,
            }}
          >
            {loadTitleButtonUpdateTask}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
