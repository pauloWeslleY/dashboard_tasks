import { useState } from 'react';
import { loadTaskDelete, useStateTask } from '@/main/store/ducks/task';
import { useAppDispatch, useAppSelector } from '@/main/store/hooks/use-redux';

import { type UseModalDeleteTaskParams, type UseModalDeleteTaskProps } from '../types';

export function useModalDeleteTask({ taskId }: UseModalDeleteTaskParams): UseModalDeleteTaskProps {
  const [openModalDeleteTask, setOpenModalDeleteTask] = useState(false);
  const tasks = useAppSelector(useStateTask);
  const dispatch = useAppDispatch();

  function handlerOpenModalDeleteTask(): void {
    setOpenModalDeleteTask(true);
  }

  function handlerCloseModalDeleteTask(): void {
    setOpenModalDeleteTask(false);
  }

  function onCloseModalDeleteTask(): void {
    if (tasks.isError || tasks.isPending) return;
    setOpenModalDeleteTask(false);
  }

  function handlerDeleteTask(): void {
    dispatch(loadTaskDelete({ taskId }));

    setTimeout(() => {
      setOpenModalDeleteTask(false);
    }, 3000);
  }

  return {
    isPendingTaskDelete: tasks.isPending,
    openModalDeleteTask,
    onCloseModalDeleteTask,
    handlerDeleteTask,
    handlerOpenModalDeleteTask,
    handlerCloseModalDeleteTask,
  };
}
