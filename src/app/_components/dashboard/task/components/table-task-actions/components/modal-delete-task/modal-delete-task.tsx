import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { useModalDeleteTask } from './hooks/use-modal-delete-task';
import * as S from './styles';

interface ModelDeleteProps {
  taskId: string;
}

export function ModalDeleteTask({ taskId }: ModelDeleteProps) {
  const {
    openModalDeleteTask,
    onCloseModalDeleteTask,
    isPendingTaskDelete,
    handlerDeleteTask,
    handlerOpenModalDeleteTask,
    handlerCloseModalDeleteTask,
  } = useModalDeleteTask(taskId);

  return (
    <>
      <Stack
        direction="row"
        spacing={1.5}
        component={MenuItem}
        disableRipple
        onClick={handlerOpenModalDeleteTask}
      >
        <Box component={TrashIcon} />
        Excluir
      </Stack>

      <S.Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={openModalDeleteTask}
        onClose={onCloseModalDeleteTask}
        closeAfterTransition
        slots={{ backdrop: S.StyledBackdrop }}
      >
        <Fade in={openModalDeleteTask}>
          <S.ModalContent sx={{ width: 450 }}>
            <Backdrop
              open={isPendingTaskDelete}
              sx={(theme) => ({
                color: theme.palette.common.white,
                zIndex: theme.zIndex.drawer + 1,
                position: 'absolute',
              })}
            >
              <Stack
                component={Paper}
                elevation={2}
                sx={{
                  background: (theme) => theme.palette.neutral[950],
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 1.5,
                }}
              >
                <CircularProgress color="primary" size={65} />
              </Stack>
            </Backdrop>

            <Stack
              direction="column"
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Box
                component={TrashIcon}
                sx={{ fontSize: 75, color: 'error.main' }}
              />

              <Stack>
                <Typography variant="h5">
                  Deseja excluir essa tarefa?
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', textAlign: 'center' }}
                >
                  ID: {taskId}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handlerCloseModalDeleteTask}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handlerDeleteTask}
                  sx={{ width: 120 }}
                >
                  Excluir
                </Button>
              </Stack>
            </Stack>
          </S.ModalContent>
        </Fade>
      </S.Modal>
    </>
  );
}
