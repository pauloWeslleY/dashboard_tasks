import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TaskSchema } from '@/app/_components/dashboard/task/schemas';
import { type FormTaskType } from '@/app/_components/dashboard/task/types';
import { loadCategoryOptions } from '@/app/database/category-options';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useGetTaskId } from '../../../hooks/use-get-task-id';

export function useFormUpdateTask() {
  const [openDialogUpdateTask, setOpenDialogUpdateTask] =
    useState(false);
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormTaskType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      nameTask: '',
      descriptionTask: '',
      categoryTask: '',
    },
  });
  const searchParamsTaskId = useSearchParams();
  const taskId = searchParamsTaskId.get('taskId');
  const { getTask } = useGetTaskId();

  const getUpdateDataFormTask = useCallback(() => {
    if (!getTask) return;
    const categoryCurrent = loadCategoryOptions.filter(
      (category) => category.value === getTask.category
    );
    setValue('nameTask', getTask.name);
    setValue('descriptionTask', getTask.description);
    setValue('categoryTask', categoryCurrent[0]?.value ?? '');
  }, [getTask, setValue]);

  useEffect(() => {
    getUpdateDataFormTask();
  }, [getUpdateDataFormTask]);

  function handlerOpenDialogUpdateTask(): void {
    setOpenDialogUpdateTask(true);
  }

  function handlerCloseDialogUpdateTask(): void {
    setOpenDialogUpdateTask(false);
  }

  function hasErrorsFormUpdateTask(): boolean {
    return Boolean(
      errors.nameTask?.message &&
        errors.descriptionTask?.message &&
        errors.categoryTask?.message
    );
  }

  const loadTitleButtonUpdateTask = isSubmitting
    ? 'Carregando...'
    : 'Editar';
  const colorIconCircleProgress = isSubmitting
    ? 'primary.light'
    : 'common.white';

  function onCloseDialogFormUpdateTask(): void {
    if (hasErrorsFormUpdateTask()) return;
    handlerCloseDialogUpdateTask();
  }

  function onUpdateTask(data: FormTaskType): void {
    console.log(data);
  }

  async function handlerUpdateTask(): Promise<void> {
    await handleSubmit(onUpdateTask)();
  }

  return {
    taskId,
    isSubmitting,
    control,
    errors,
    loadTitleButtonUpdateTask,
    colorIconCircleProgress,
    onCloseDialogFormUpdateTask,
    openDialogUpdateTask,
    handlerUpdateTask,
    handlerOpenDialogUpdateTask,
    handlerCloseDialogUpdateTask,
  };
}
