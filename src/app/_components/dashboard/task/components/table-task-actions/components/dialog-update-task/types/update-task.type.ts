import { type FormTaskType } from '@/app/_components/dashboard/task/types';
import { type Control, type FieldErrors } from 'react-hook-form';

export interface UpdateTaskProps {
  control: Control<FormTaskType>;
  errors: FieldErrors<FormTaskType>;
}
