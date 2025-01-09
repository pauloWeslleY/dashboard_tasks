import { type TaskModel } from '@/data/models/task.model';

export interface UseTaskInfoType {
  loadTaskInfo: TaskModel;
  errorTaskInfoMessage: string;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}
