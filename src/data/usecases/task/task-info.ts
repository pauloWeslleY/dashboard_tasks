import { type TaskModel } from '@/data/models/task.model';

export interface ITaskInfoDTO {
  taskId: string;
}

export interface ITaskInfo {
  exec(taskId: ITaskInfoDTO): Promise<TaskModel>;
}
