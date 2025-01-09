import { useError } from '@/app/hooks/use-error';
import { loadTaskCreate, setTaskSuccess, useStateTask } from '@/main/store/ducks/task';
import { useAppDispatch, useAppSelector } from '@/main/store/hooks/use-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { TaskSchema } from '../schemas';
import { type FormTaskType, type UseFormCreateTaskType } from '../types';
import { useModalCreateTask } from './use-modal-create-task';

export function useFormCreateTask(): UseFormCreateTaskType {
  const formCreateTask = useForm<FormTaskType>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      nameTask: '',
      descriptionTask: '',
      categoryTask: '',
    },
  });
  const task = useAppSelector(useStateTask);
  const { openModalCreateTask, handleCloseModalCreateTask, handleOpenModalCreateTask } = useModalCreateTask();
  const { errorMessage: errorCreateTaskMessage } = useError(task.error);
  const dispatch = useAppDispatch();
  const { errors } = formCreateTask.formState;

  function hasErrorsFormCreateTask(): boolean {
    return Boolean(errors.root?.message);
  }

  const hasShowFormCreateTaskAlertError: boolean = task.isError || hasErrorsFormCreateTask();
  const hasShowFormCreateTaskAlertSuccess: boolean = task.isSuccess;
  const loadTitleButtonCreateTask = task.isPending ? 'Carregando...' : 'Cadastrar';

  function hasFormCreateTaskMessage(): string {
    if (hasErrorsFormCreateTask()) return 'Preencha os campos';
    if (task.isSuccess) return 'Uma nova tarefa foi criada';
    if (task.isError) return errorCreateTaskMessage;
    return '';
  }

  function onCloseModalFormCreateTask(): void {
    if (hasErrorsFormCreateTask() || task.isError || task.isPending) return;
    handleCloseModalCreateTask();
  }

  function onCreateTask(data: FormTaskType): void {
    dispatch(loadTaskCreate(data));

    setTimeout(() => {
      if (task.isError) return;
      onCloseModalFormCreateTask();
      dispatch(setTaskSuccess(false));
      formCreateTask.reset();
    }, 3000);
  }

  async function handlerCreateTask(): Promise<void> {
    await formCreateTask.handleSubmit(onCreateTask)();
  }

  return {
    isPendingCreateTask: task.isPending,
    errorCreateTaskMessage,
    control: formCreateTask.control,
    errors,
    loadTitleButtonCreateTask,
    hasShowFormCreateTaskAlertError,
    hasShowFormCreateTaskAlertSuccess,
    hasFormCreateTaskMessage: hasFormCreateTaskMessage(),
    onCloseModalFormCreateTask,
    openModalCreateTask,
    handlerCreateTask,
    handleOpenModalCreateTask,
    handleCloseModalCreateTask,
  };
}
