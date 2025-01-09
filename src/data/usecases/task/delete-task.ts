export interface IDeleteTaskDTO {
  taskId: string;
}

export interface IDeleteTask {
  execDeleteTask(taskId: IDeleteTaskDTO): Promise<void>;
}
