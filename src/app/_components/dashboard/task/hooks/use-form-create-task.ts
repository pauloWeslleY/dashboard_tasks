import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { TaskSchema } from '../schemas/task.schema';
import { type FormTaskType } from '../types/form-task.type';

export function useFormCreateTask() {
  const [openModalCreateTask, setOpenModalCreateTask] =
    useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormTaskType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      nameTask: '',
      descriptionTask: '',
      categoryTask: '',
    },
  });

  function handleOpenModalCreateTask() {
    setOpenModalCreateTask(true);
  }

  function handleCloseModalCreateTask() {
    setOpenModalCreateTask(false);
  }

  function onCloseModalFormCreateTask() {
    handleCloseModalCreateTask();
  }

  function onCreateTask(data: FormTaskType) {
    console.log(data);
  }

  async function handlerCreateTask(): Promise<void> {
    await handleSubmit(onCreateTask)();
  }

  return {
    control,
    errors,
    isSubmitting,
    onCloseModalFormCreateTask,
    openModalCreateTask,
    handlerCreateTask,
    handleOpenModalCreateTask,
    handleCloseModalCreateTask,
  };
}
