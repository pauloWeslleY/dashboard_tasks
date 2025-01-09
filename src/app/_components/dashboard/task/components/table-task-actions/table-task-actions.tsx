'use client';

import React, { type ReactElement } from 'react';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Checks as ChecksIcon } from '@phosphor-icons/react/dist/ssr/Checks';
import { DotsThreeCircleVertical as DotsThreeCircleVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeCircleVertical';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';

import { DialogUpdateTask, ModalDeleteTask } from './components';
import { useTableTaskActions } from './hooks';
import { StyledMenu } from './styles';
import { TASK_STATUS, type TableTaskActionsType, type TaskStatusType } from './types';

export function TableTaskActions({ taskId, taskStatus, isSelected }: TableTaskActionsType): React.JSX.Element {
  const {
    openMenuTaskTableActions,
    anchorMenuElTaskTableActions,
    openSnackbarTaskTableActions,
    handlerOpenMenuTaskTableActions,
    handlerCloseMenuTaskTableActions,
    handlerCloseSnackbarTaskTableActions,
    handlerToggleTaskStatus,
  } = useTableTaskActions({ taskId, taskStatus, taskSelected: isSelected });

  const TASK_STATUS_ICONS: Record<TaskStatusType, ReactElement> = {
    [TASK_STATUS.DONE]: <ChecksIcon />,
    [TASK_STATUS.NOT_DONE]: <TimerIcon />,
  };

  return (
    <TableCell>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'end' }}>
        <Tooltip title={taskStatus ? 'Desmarcar Tarefas' : 'Marcar tarefa'}>
          <IconButton
            aria-label="toggle task status"
            color={taskStatus ? 'success' : 'warning'}
            onClick={handlerToggleTaskStatus}
          >
            {TASK_STATUS_ICONS[taskStatus ? TASK_STATUS.DONE : TASK_STATUS.NOT_DONE]}
          </IconButton>
        </Tooltip>

        <Fade in={isSelected}>
          <Tooltip title="Menu Editar tarefa">
            <IconButton
              id="update-task-button"
              aria-label="more"
              aria-haspopup="true"
              aria-controls={openMenuTaskTableActions ? 'update-task-menu' : undefined}
              aria-expanded={openMenuTaskTableActions ? 'true' : undefined}
              onClick={handlerOpenMenuTaskTableActions}
              color="primary"
            >
              <DotsThreeCircleVerticalIcon size={25} />
            </IconButton>
          </Tooltip>
        </Fade>
      </Stack>

      <StyledMenu
        id="update-task-menu"
        open={openMenuTaskTableActions}
        anchorEl={anchorMenuElTaskTableActions}
        onClose={handlerCloseMenuTaskTableActions}
        MenuListProps={{
          'aria-labelledby': 'update-task-button',
        }}
      >
        <DialogUpdateTask />

        <ModalDeleteTask taskId={taskId} />
      </StyledMenu>

      <Snackbar
        open={openSnackbarTaskTableActions}
        onClose={handlerCloseSnackbarTaskTableActions}
        TransitionComponent={Slide}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handlerCloseSnackbarTaskTableActions}
          severity="warning"
          variant="filled"
          sx={{ width: '100%', color: 'common.white' }}
        >
          <Typography variant="subtitle1">Selecione uma tarefa!</Typography>
        </Alert>
      </Snackbar>
    </TableCell>
  );
}
