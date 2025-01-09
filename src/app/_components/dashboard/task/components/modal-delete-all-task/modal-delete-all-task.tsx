import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Trash, Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { useModalDeleteAllTask } from './hooks';
import * as S from './styles';

export function ModalDeleteAllTask(): React.JSX.Element {
  const {
    openModalDeleteAllTask,
    onCloseModalDeleteAllTask,
    isPendingTaskDelete,
    handlerDeleteAllTask,
    handlerOpenModalDeleteAllTask,
    handlerCloseModalDeleteAllTask,
  } = useModalDeleteAllTask();

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={handlerOpenModalDeleteAllTask}
        startIcon={<Box component={TrashIcon} />}
      >
        Excluir todas
      </Button>

      <S.Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={openModalDeleteAllTask}
        onClose={onCloseModalDeleteAllTask}
        closeAfterTransition
        slots={{ backdrop: S.StyledBackdrop }}
      >
        <Fade in={openModalDeleteAllTask}>
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

            <Stack direction="column" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Box component={Trash} sx={{ width: 75, height: 75, color: 'error.main' }} />

              <Stack>
                <Typography variant="h5">Deseja excluir todas as tarefa?</Typography>
              </Stack>
              <Stack direction="row" spacing={1.5}>
                <Button variant="outlined" color="secondary" onClick={handlerCloseModalDeleteAllTask}>
                  Cancelar
                </Button>
                <Button variant="contained" color="error" onClick={handlerDeleteAllTask}>
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
