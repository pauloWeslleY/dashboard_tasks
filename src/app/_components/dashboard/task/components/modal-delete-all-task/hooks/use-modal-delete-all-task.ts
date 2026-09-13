import { useState } from 'react';

import { type UseModalDeleteAllTaskProps } from '../types';

export function useModalDeleteAllTask(): UseModalDeleteAllTaskProps {
  const [openModalDeleteAllTask, setOpenModalDeleteAllTask] =
    useState(false);
  const isPendingTaskDelete = false;
  function handlerOpenModalDeleteAllTask(): void {
    setOpenModalDeleteAllTask(true);
  }

  function handlerCloseModalDeleteAllTask(): void {
    setOpenModalDeleteAllTask(false);
  }

  function onCloseModalDeleteAllTask(): void {
    setOpenModalDeleteAllTask(false);
  }

  function handlerDeleteAllTask(): void {
    console.log('handlerDeleteAllTask called');
  }

  return {
    isPendingTaskDelete,
    openModalDeleteAllTask,
    onCloseModalDeleteAllTask,
    handlerDeleteAllTask,
    handlerOpenModalDeleteAllTask,
    handlerCloseModalDeleteAllTask,
  };
}
