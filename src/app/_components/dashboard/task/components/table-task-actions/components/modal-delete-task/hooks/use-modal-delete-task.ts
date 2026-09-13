import { useState } from 'react';
import { useDeleteTaskMutation } from '@/app/_components/dashboard/task/hooks/use-delete-task-mutation';
import { deleteTaskAction } from '@/server-action/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useModalDeleteTask(onCloseModal?: () => void) {
  const { deleteTask, isPendingDeleteTask } = useDeleteTaskMutation();

  function onCloseModalDeleteTask() {
    if (isPendingDeleteTask || !onCloseModal) return;
    onCloseModal();
  }

  function handlerDeleteTask(taskId: string) {
    deleteTask(taskId);
  }

  return {
    isPendingDeleteTask,
    onCloseModalDeleteTask,
    handlerDeleteTask,
  };
}
