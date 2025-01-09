import { type TaskModel } from '@/data/models/task.model';

export interface ICreateTaskDTO {
  nameTask: string;
  descriptionTask: string;
  categoryTask: string;
}

export interface ICreateTask {
  execCreateTask(data: ICreateTaskDTO): Promise<TaskModel>;
}
