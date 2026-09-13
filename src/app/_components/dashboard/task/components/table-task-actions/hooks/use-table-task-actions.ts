import {
  useState,
  type MouseEvent,
  type SyntheticEvent,
} from 'react';
import { type SnackbarCloseReason } from '@mui/material/Snackbar';

import { useUpdateStatusTaskMutation } from '../../../hooks/use-update-status-task-mutation';

interface UseTableTaskActionsParams {
  taskId: string;
  taskSelected: boolean;
  taskStatus: boolean;
}

export function useTableTaskActions({
  taskId,
  taskStatus,
  taskSelected,
}: UseTableTaskActionsParams) {
  const [
    anchorMenuElTaskTableActions,
    setAnchorMenuElTaskTableActions,
  ] = useState<null | HTMLElement>(null);
  const [
    openSnackbarTaskTableActions,
    setOpenSnackbarTaskTableActions,
  ] = useState(false);
  const { updateStatusTask } = useUpdateStatusTaskMutation();

  const openMenuTaskTableActions = Boolean(
    anchorMenuElTaskTableActions
  );

  function handlerCloseSnackbarTaskTableActions(
    _event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) {
    if (reason === 'clickaway') return;
    setOpenSnackbarTaskTableActions(false);
  }

  function handlerOpenMenuTaskTableActions(
    event: MouseEvent<HTMLElement>
  ) {
    setAnchorMenuElTaskTableActions(event.currentTarget);
  }

  function handlerCloseMenuTaskTableActions() {
    setAnchorMenuElTaskTableActions(null);
  }

  function handlerToggleTaskStatus() {
    if (!taskSelected) {
      setOpenSnackbarTaskTableActions(true);
      return;
    }

    updateStatusTask({ id: taskId, status: !taskStatus });
  }

  return {
    openMenuTaskTableActions,
    anchorMenuElTaskTableActions,
    openSnackbarTaskTableActions,
    handlerOpenMenuTaskTableActions,
    handlerCloseMenuTaskTableActions,
    handlerCloseSnackbarTaskTableActions,
    handlerToggleTaskStatus,
  };
}
