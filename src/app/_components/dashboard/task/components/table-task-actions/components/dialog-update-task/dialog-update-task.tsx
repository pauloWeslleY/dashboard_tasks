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

import { useFormUpdateTask } from './hooks';
import { UpdateTask } from './update-task';

export function DialogUpdateTask(): React.JSX.Element {
  const {
    taskId,
    openDialogUpdateTask,
    control,
    errors,
    isPendingUpdateTask,
    hasFormTaskUpdateMessage,
    hasShowFormTaskUpdateAlertError,
    hasShowFormTaskUpdateAlertSuccess,
    loadTitleButtonUpdateTask,
    colorIconCircleProgress,
    handlerUpdateTask,
    handlerOpenDialogUpdateTask,
    handlerCloseDialogUpdateTask,
    onCloseDialogFormUpdateTask,
  } = useFormUpdateTask();

  return (
    <React.Fragment>
      <Stack direction="row" spacing={1.5} component={MenuItem} disableRipple onClick={handlerOpenDialogUpdateTask}>
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
          open={isPendingUpdateTask}
        >
          <CircularProgress color="primary" size={65} />
        </Backdrop>

        <Typography id="task-dialog-title" component={DialogTitle} variant="h5" sx={{ color: 'primary.dark' }}>
          Editar Tarefa{' '}
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            ID: {taskId}
          </Typography>
        </Typography>

        <DialogContent>
          <UpdateTask control={control} errors={errors} />

          <Box sx={{ width: '100%', paddingTop: 2, paddingX: 1 }}>
            {hasShowFormTaskUpdateAlertError && <Alert severity="error">{hasFormTaskUpdateMessage}</Alert>}
            {hasShowFormTaskUpdateAlertSuccess && <Alert severity="success">{hasFormTaskUpdateMessage}</Alert>}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handlerCloseDialogUpdateTask}
            disabled={isPendingUpdateTask}
            color="error"
            variant="outlined"
          >
            Cancelar
          </Button>

          <Button
            onClick={handlerUpdateTask}
            variant="contained"
            disabled={isPendingUpdateTask}
            startIcon={isPendingUpdateTask && <CircularProgress size="20px" sx={{ color: colorIconCircleProgress }} />}
            sx={{
              display: 'flex',
              alignItem: 'center',
              gap: 1,
              width: isPendingUpdateTask ? 'max-content' : 120,
            }}
          >
            {loadTitleButtonUpdateTask}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
