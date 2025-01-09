import { type TaskModel } from '@/data/models/task.model';

export interface ITaskUpdateStatusDTO {
  taskId: string;
  status: boolean;
}

export interface ITaskUpdateStatus {
  toggleTaskStatus(status: ITaskUpdateStatusDTO): Promise<TaskModel>;
}
