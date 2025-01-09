import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TaskSchema } from '@/app/_components/dashboard/task/schemas';
import { type FormTaskType } from '@/app/_components/dashboard/task/types';
import { loadCategoryOptions } from '@/app/database/category-options';
import { useError } from '@/app/hooks/use-error';
import { loadTaskInfo, loadTaskUpdate, setTaskSuccess, useStateTask, useStateTaskInfo } from '@/main/store/ducks/task';
import { useAppDispatch, useAppSelector } from '@/main/store/hooks/use-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { type UseFormUpdateTaskType } from '../types';
import { useDialogUpdateTask } from './use-dialog-update-task';

export function useFormUpdateTask(): UseFormUpdateTaskType {
  const { setValue, control, handleSubmit, formState } = useForm<FormTaskType>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      nameTask: '',
      descriptionTask: '',
      categoryTask: '',
    },
  });
  const {
    isPending: isPendingTask,
    error: errorTask,
    isError: isErrorTask,
    isSuccess: isSuccessTask,
  } = useAppSelector(useStateTask);
  const { data: loadTaskDetail, isLoading: isLoadingTaskInfo } = useAppSelector(useStateTaskInfo);
  const { openDialogUpdateTask, handlerCloseDialogUpdateTask, handlerOpenDialogUpdateTask } = useDialogUpdateTask();
  const { errorMessage: errorTaskUpdateMessage } = useError(errorTask);
  const searchParamsTaskId = useSearchParams();
  const taskId = searchParamsTaskId.get('taskId');
  const dispatch = useAppDispatch();
  const { errors } = formState;

  const getTaskInfo = useCallback(() => {
    if (!taskId) return;
    dispatch(loadTaskInfo({ taskId }));
  }, [dispatch, taskId]);

  const getUpdateDataFormTask = useCallback(() => {
    if (!loadTaskDetail) return;

    const categoryCurrent = loadCategoryOptions.filter((category) => {
      return category.value === loadTaskDetail.category;
    });

    setValue('nameTask', loadTaskDetail.name);
    setValue('descriptionTask', loadTaskDetail.description);
    setValue('categoryTask', categoryCurrent[0]?.value ?? '');
  }, [loadTaskDetail, setValue]);

  useEffect(() => {
    getTaskInfo();
  }, [getTaskInfo]);

  useEffect(() => {
    getUpdateDataFormTask();
  }, [getUpdateDataFormTask]);

  function hasErrorsFormUpdateTask(): boolean {
    return Boolean(errors.nameTask?.message && errors.descriptionTask?.message && errors.categoryTask?.message);
  }

  const hasShowFormTaskUpdateAlertError: boolean = isErrorTask || hasErrorsFormUpdateTask();
  const hasShowFormTaskUpdateAlertSuccess: boolean = isSuccessTask;
  const loadTitleButtonUpdateTask = isPendingTask ? 'Carregando...' : 'Editar';
  const colorIconCircleProgress = isPendingTask ? 'primary.light' : 'common.white';

  function hasFormMessage(): string {
    if (hasErrorsFormUpdateTask()) return 'Preencha os campos';
    if (isSuccessTask) return 'Tarefa atualizada';
    if (isErrorTask) return errorTaskUpdateMessage;
    return '';
  }

  function onCloseDialogFormUpdateTask(): void {
    if (hasErrorsFormUpdateTask() || isPendingTask || isErrorTask) return;
    handlerCloseDialogUpdateTask();
  }

  function onUpdateTask(data: FormTaskType): void {
    if (!loadTaskDetail) return;
    dispatch(loadTaskUpdate({ taskId: loadTaskDetail.id, ...data }));

    setTimeout(() => {
      if (isErrorTask) return;
      onCloseDialogFormUpdateTask();
      dispatch(setTaskSuccess(false));
    }, 5000);
  }

  async function handlerUpdateTask(): Promise<void> {
    await handleSubmit(onUpdateTask)();
  }

  return {
    taskId,
    isPendingUpdateTask: isPendingTask || isLoadingTaskInfo,
    control,
    errors,
    loadTitleButtonUpdateTask,
    colorIconCircleProgress,
    hasShowFormTaskUpdateAlertError,
    hasShowFormTaskUpdateAlertSuccess,
    hasFormTaskUpdateMessage: hasFormMessage(),
    onCloseDialogFormUpdateTask,
    openDialogUpdateTask,
    handlerUpdateTask,
    handlerOpenDialogUpdateTask,
    handlerCloseDialogUpdateTask,
  };
}
