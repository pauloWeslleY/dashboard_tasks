import { useState } from 'react';

export function useModalDeleteTask(taskId: string) {
  const [openModalDeleteTask, setOpenModalDeleteTask] =
    useState(false);

  function handlerOpenModalDeleteTask(): void {
    setOpenModalDeleteTask(true);
  }

  function handlerCloseModalDeleteTask(): void {
    setOpenModalDeleteTask(false);
  }

  function onCloseModalDeleteTask(): void {
    setOpenModalDeleteTask(false);
  }

  function handlerDeleteTask(): void {
    console.log('Deleting task with ID:', taskId);
  }

  return {
    isPendingTaskDelete: false,
    openModalDeleteTask,
    onCloseModalDeleteTask,
    handlerDeleteTask,
    handlerOpenModalDeleteTask,
    handlerCloseModalDeleteTask,
  };
}
