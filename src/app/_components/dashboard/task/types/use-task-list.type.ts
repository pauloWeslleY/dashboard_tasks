import { type TaskModel } from '@/data/models/task.model';

export interface UseTaskListType {
  loadTaskList: TaskModel[];
  errorTasks: string;
  isErrorTasks: boolean;
  isSuccessTasks: boolean;
  isLoadingTasks: boolean;
  isPendingTasks: boolean;
}
