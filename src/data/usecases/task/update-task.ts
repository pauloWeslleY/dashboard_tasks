import { type TaskModel } from '@/data/models/task.model';

export interface IUpdateTaskDTO {
  taskId: string;
  nameTask: string;
  descriptionTask: string;
  categoryTask: string;
}

export interface IUpdateTask {
  execUpdateTask(data: IUpdateTaskDTO): Promise<TaskModel>;
}
