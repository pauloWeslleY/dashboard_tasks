import { useCallback, useState, type MouseEvent, type SyntheticEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { loadTaskToggleStatus } from '@/main/store/ducks/task';
import { useAppDispatch } from '@/main/store/hooks/use-redux';
import { type SnackbarCloseReason } from '@mui/material/Snackbar';

import { type UseTableTaskActions } from '../types';

export function useTableTaskActions({
  taskId,
  taskStatus,
  taskSelected,
}: UseTableTaskActions.Params): UseTableTaskActions.Type {
  const [anchorMenuElTaskTableActions, setAnchorMenuElTaskTableActions] = useState<null | HTMLElement>(null);
  const [openSnackbarTaskTableActions, setOpenSnackbarTaskTableActions] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const openMenuTaskTableActions = Boolean(anchorMenuElTaskTableActions);
  const dispatch = useAppDispatch();

  const createSearchParamsTaskURL = useCallback((): void => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('taskId', taskId);
    const searchParamsURL = `${pathname}?${newSearchParams.toString()}`;
    router.push(searchParamsURL);
  }, [taskId, searchParams, router, pathname]);

  function handlerCloseSnackbarTaskTableActions(_event?: SyntheticEvent | Event, reason?: SnackbarCloseReason): void {
    if (reason === 'clickaway') return;
    setOpenSnackbarTaskTableActions(false);
  }

  function handlerOpenMenuTaskTableActions(event: MouseEvent<HTMLElement>): void {
    createSearchParamsTaskURL();
    setAnchorMenuElTaskTableActions(event.currentTarget);
  }

  function handlerCloseMenuTaskTableActions(): void {
    setAnchorMenuElTaskTableActions(null);
  }

  function handlerToggleTaskStatus(): void {
    if (!taskSelected) {
      setOpenSnackbarTaskTableActions(true);
      return;
    }

    dispatch(loadTaskToggleStatus({ taskId, status: !taskStatus }));
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
