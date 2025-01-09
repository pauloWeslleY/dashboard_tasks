import { useState } from 'react';
import { loadTaskDeleteAll, useStateTask } from '@/main/store/ducks/task';
import { useAppDispatch, useAppSelector } from '@/main/store/hooks/use-redux';

import { type UseModalDeleteAllTaskProps } from '../types';

export function useModalDeleteAllTask(): UseModalDeleteAllTaskProps {
  const [openModalDeleteAllTask, setOpenModalDeleteAllTask] = useState(false);
  const tasks = useAppSelector(useStateTask);
  const dispatch = useAppDispatch();

  function handlerOpenModalDeleteAllTask(): void {
    setOpenModalDeleteAllTask(true);
  }

  function handlerCloseModalDeleteAllTask(): void {
    setOpenModalDeleteAllTask(false);
  }

  function onCloseModalDeleteAllTask(): void {
    if (tasks.isError || tasks.isPending) return;
    setOpenModalDeleteAllTask(false);
  }

  function handlerDeleteAllTask(): void {
    dispatch(loadTaskDeleteAll());

    setTimeout(() => {
      setOpenModalDeleteAllTask(false);
    }, 3000);
  }

  return {
    isPendingTaskDelete: tasks.isPending,
    openModalDeleteAllTask,
    onCloseModalDeleteAllTask,
    handlerDeleteAllTask,
    handlerOpenModalDeleteAllTask,
    handlerCloseModalDeleteAllTask,
  };
}
