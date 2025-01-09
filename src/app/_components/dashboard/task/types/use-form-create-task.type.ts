import { type Control, type FieldErrors } from 'react-hook-form';

import { type FormTaskType } from './form-task.type';
import { type UseModalCreateTaskType } from './use-modal-create-task.type';

export interface UseFormCreateTaskType extends UseModalCreateTaskType {
  isPendingCreateTask: boolean;
  errorCreateTaskMessage: string;
  hasShowFormCreateTaskAlertError: boolean;
  hasShowFormCreateTaskAlertSuccess: boolean;
  hasFormCreateTaskMessage: string;
  loadTitleButtonCreateTask: 'Carregando...' | 'Cadastrar';
  control: Control<FormTaskType>;
  errors: FieldErrors<FormTaskType>;
  onCloseModalFormCreateTask(): void;
  handlerCreateTask(): Promise<void>;
}
