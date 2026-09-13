'use client';

import React, { useMemo, useState, type ReactElement } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Checks as ChecksIcon } from '@phosphor-icons/react/dist/ssr/Checks';
import { DotsThreeCircleVertical as DotsThreeCircleVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeCircleVertical';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { DialogUpdateTask, ModalDeleteTask } from './components';
import { useTableTaskActions } from './hooks/use-table-task-actions';
import { StyledMenu } from './styles';
import {
  TASK_STATUS,
  taskStatusValues,
  type TaskStatusType,
} from './types/table-task-actions.type';

interface TableTaskActionsType {
  taskId: string;
  taskStatus: boolean;
  isSelected: boolean;
}

export function TableTaskActions({
  taskId,
  taskStatus,
  isSelected,
}: TableTaskActionsType) {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    openMenuTaskTableActions,
    anchorMenuElTaskTableActions,
    openSnackbarTaskTableActions,
    handlerOpenMenuTaskTableActions,
    handlerCloseMenuTaskTableActions,
    handlerCloseSnackbarTaskTableActions,
    handlerToggleTaskStatus,
  } = useTableTaskActions({
    taskId,
    taskStatus,
    taskSelected: isSelected,
  });

  const loadTaskStatus = useMemo<ReactElement>(() => {
    const TASK_STATUS_ICONS: Record<TaskStatusType, ReactElement> = {
      [TASK_STATUS.DONE]: <ChecksIcon />,
      [TASK_STATUS.NOT_DONE]: <TimerIcon />,
    };

    return TASK_STATUS_ICONS[taskStatusValues(taskStatus)];
  }, [taskStatus]);

  const handleOpenUpdateDialog = () => {
    handlerCloseMenuTaskTableActions();
    setOpenUpdateDialog(true);
  };

  const handleOpenDeleteModal = () => {
    handlerCloseMenuTaskTableActions();
    setOpenDeleteModal(true);
  };

  return (
    <TableCell>
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: 'end' }}
      >
        <Tooltip
          title={taskStatus ? 'Desmarcar Tarefas' : 'Marcar tarefa'}
        >
          <IconButton
            aria-label="toggle task status"
            color={taskStatus ? 'success' : 'warning'}
            onClick={handlerToggleTaskStatus}
          >
            {loadTaskStatus}
          </IconButton>
        </Tooltip>

        <Fade in={isSelected}>
          <Tooltip title="Menu Editar tarefa">
            <IconButton
              id="update-task-button"
              aria-label="more"
              aria-haspopup="true"
              aria-controls={
                openMenuTaskTableActions
                  ? 'update-task-menu'
                  : undefined
              }
              aria-expanded={
                openMenuTaskTableActions ? 'true' : undefined
              }
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
        <Stack
          direction="row"
          spacing={1.5}
          component={MenuItem}
          disableRipple
          onClick={handleOpenUpdateDialog}
        >
          <Box component={PencilSimpleIcon} />
          Editar
        </Stack>

        <Stack
          direction="row"
          spacing={1.5}
          component={MenuItem}
          disableRipple
          onClick={handleOpenDeleteModal}
        >
          <Box component={TrashIcon} />
          Excluir
        </Stack>
      </StyledMenu>

      <DialogUpdateTask
        taskId={taskId}
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
      />

      <ModalDeleteTask
        taskId={taskId}
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />

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
          <Typography variant="subtitle1">
            Selecione uma tarefa!
          </Typography>
        </Alert>
      </Snackbar>
    </TableCell>
  );
}
