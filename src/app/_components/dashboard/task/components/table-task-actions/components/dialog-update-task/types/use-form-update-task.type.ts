import { type FormTaskType } from '@/app/_components/dashboard/task/types';
import { type Control, type FieldErrors } from 'react-hook-form';

import { type UseDialogUpdateTaskType } from './use-dialog-update-task.type';

export interface UseFormUpdateTaskType extends UseDialogUpdateTaskType {
  taskId: string | null;
  isPendingUpdateTask: boolean;
  hasShowFormTaskUpdateAlertError: boolean;
  hasShowFormTaskUpdateAlertSuccess: boolean;
  hasFormTaskUpdateMessage: string;
  loadTitleButtonUpdateTask: 'Carregando...' | 'Editar';
  colorIconCircleProgress: 'primary.light' | 'common.white';
  control: Control<FormTaskType>;
  errors: FieldErrors<FormTaskType>;
  onCloseDialogFormUpdateTask(): void;
  handlerUpdateTask(): Promise<void>;
}
