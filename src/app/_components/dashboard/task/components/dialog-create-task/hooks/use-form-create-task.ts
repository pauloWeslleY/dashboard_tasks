import { useState } from 'react';
import { authClient } from '@/infra/auth/auth-client';
import { createTaskAction } from '@/server-action/task';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { TaskSchema } from '../../../schemas/task.schema';
import { type FormTaskType } from '../../../types/form-task.type';

export function useFormCreateTask() {
  const [openModalCreateTask, setOpenModalCreateTask] =
    useState(false);
  const { data: authSession } = authClient.useSession();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormTaskType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
    },
  });

  const { mutate: createTask, isPending: isPendingCreateTask } =
    useMutation({
      mutationFn: (data: {
        name: string;
        description: string;
        category: string;
        userId: string;
      }) => createTaskAction(data),
    });

  function handleOpenModalCreateTask() {
    setOpenModalCreateTask(true);
  }

  function handleCloseModalCreateTask() {
    setOpenModalCreateTask(false);
  }

  function onCloseModalFormCreateTask() {
    if (isPendingCreateTask) return;
    handleCloseModalCreateTask();
  }

  const handlerCreateTask = handleSubmit((data) => {
    if (!authSession?.user) {
      setError('root', {
        type: 'manual',
        message: 'Usuário não autenticado.',
      });
      return;
    }

    createTask(
      {
        name: data.name,
        description: data.description,
        category: data.category,
        userId: authSession.user.id,
      },
      {
        onSuccess: (result) => {
          if (!result.success) {
            setError('root', {
              type: 'manual',
              message: result.error,
            });
            return;
          }
          queryClient.invalidateQueries({ queryKey: ['tasks'] });
          reset();
          handleCloseModalCreateTask();
        },
        onError: (error) => {
          setError('root', {
            type: 'manual',
            message: error?.message || 'Erro ao criar tarefa.',
          });
        },
      }
    );
  });

  return {
    control,
    errors,
    isPendingCreateTask,
    onCloseModalFormCreateTask,
    openModalCreateTask,
    handlerCreateTask,
    handleOpenModalCreateTask,
    handleCloseModalCreateTask,
  };
}
