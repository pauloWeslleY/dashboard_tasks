import { useState } from 'react';

import { useDeleteTaskMutation } from '../../../hooks/use-delete-task-mutation';

export function useModalDeleteAllTask() {
  const [openModalDeleteAllTask, setOpenModalDeleteAllTask] =
    useState(false);
  const { deleteTask, isPendingDeleteTask } = useDeleteTaskMutation();

  function handlerOpenModalDeleteAllTask() {
    setOpenModalDeleteAllTask(true);
  }

  function handlerCloseModalDeleteAllTask() {
    setOpenModalDeleteAllTask(false);
  }

  function onCloseModalDeleteAllTask() {
    setOpenModalDeleteAllTask(false);
  }

  function handlerDeleteAllTask(taskIds: Set<string>) {
    taskIds.forEach((taskId) => deleteTask(taskId));
  }

  return {
    isPendingDeleteTask,
    openModalDeleteAllTask,
    onCloseModalDeleteAllTask,
    handlerDeleteAllTask,
    handlerOpenModalDeleteAllTask,
    handlerCloseModalDeleteAllTask,
  };
}
