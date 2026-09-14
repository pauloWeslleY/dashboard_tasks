import { useCallback, useEffect, useState } from 'react';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { TaskSchema } from '@/app/_components/dashboard/task/schemas';
import { type FormTaskType } from '@/app/_components/dashboard/task/types';
import { loadCategoryOptions } from '@/app/database/category-options';
import { updateTaskAction } from '@/server-action/task';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { TaskModel } from '@/data/models/task.model';

import { useGetTaskId } from '../../../hooks/use-get-task-id';

export function useFormUpdateTask(
  taskId: string,
  openDialogUpdateTask: boolean,
  onCloseModal?: () => void
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const {
    reset,
    setError,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormTaskType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
    },
  });
  const { getTask, isLoadingTask } = useGetTaskId(
    openDialogUpdateTask,
    taskId
  );

  const { mutate: updateTask, isPending: isPendingUpdateTask } =
    useMutation({
      mutationFn: (data: {
        name: string;
        description: string;
        category: string;
        id: string;
      }) => updateTaskAction(data),
    });

  const getUpdateDataFormTask = useCallback(() => {
    if (!getTask) return;
    const categoryCurrent = loadCategoryOptions.filter(
      (category) => category.value === getTask.category
    );
    reset({
      name: getTask.name,
      description: getTask.description,
      category: categoryCurrent[0]?.value ?? '',
    });
  }, [getTask, reset]);

  useEffect(() => {
    getUpdateDataFormTask();
  }, [getUpdateDataFormTask]);

  const isLoadingUpdateTask = isLoadingTask || isPendingUpdateTask;

  const loadTitleButtonUpdateTask = isPendingUpdateTask
    ? 'Carregando...'
    : 'Editar';

  const colorIconCircleProgress = isPendingUpdateTask
    ? 'primary.light'
    : 'common.white';

  function handlerCloseDialogUpdateTask() {
    onCloseModal?.();
  }

  function onCloseDialogFormUpdateTask() {
    if (isPendingUpdateTask) return;

    if (onCloseModal) {
      onCloseModal();
    }

    handlerCloseDialogUpdateTask();
  }

  const handlerUpdateTask = handleSubmit((data) => {
    if (!taskId) {
      setError('root', {
        type: 'manual',
        message: 'Usuário não autenticado.',
      });
      return;
    }

    if (!isDirty) {
      setError('root', {
        type: 'manual',
        message: 'Nenhuma alteração foi feita.',
      });
      return;
    }

    updateTask(
      { ...data, id: taskId },
      {
        onSuccess: async (result) => {
          if (!result.success) {
            setError('root', {
              type: 'manual',
              message: result.error,
            });
            return;
          }
          await queryClient.invalidateQueries({
            queryKey: ['tasks'],
          });
          if (taskId) {
            await queryClient.invalidateQueries({
              queryKey: ['task', taskId],
            });
          }
          reset(data);
          onCloseDialogFormUpdateTask();
        },
        onError: (error) => {
          setError('root', {
            type: 'manual',
            message: error?.message || 'Erro ao atualizar tarefa.',
          });
        },
      }
    );
  });

  return {
    isLoadingUpdateTask,
    isPendingUpdateTask,
    control,
    errors,
    loadTitleButtonUpdateTask,
    colorIconCircleProgress,
    onCloseDialogFormUpdateTask,
    openDialogUpdateTask,
    handlerUpdateTask,
    handlerCloseDialogUpdateTask,
  };
}
