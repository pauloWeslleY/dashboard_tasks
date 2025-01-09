import {
  type ITaskCreateRepositoryParams,
  type ITaskDeleteRepository,
  type ITaskDetailsRepository,
  type ITaskListRepository,
  type ITaskRepository,
  type ITaskUpdateRepositoryParams,
  type ITaskUpdateStatusRepositoryParams,
} from '@/domain/task';

import { type TaskModel } from '@/data/models/task.model';
import {
  type ICreateTask,
  type ICreateTaskDTO,
  type IDeleteTask,
  type IDeleteTaskDTO,
  type ITaskInfo,
  type ITaskInfoDTO,
  type ITaskList,
  type ITaskUpdateStatus,
  type ITaskUpdateStatusDTO,
  type IUpdateTask,
  type IUpdateTaskDTO,
} from '@/data/usecases';

export interface ITaskRepositoryFactory {
  taskListRepository: ITaskListRepository;
  taskDeleteRepository: ITaskDeleteRepository;
  taskDetailRepository: ITaskDetailsRepository;
  taskCreateRepository: ITaskRepository<ITaskCreateRepositoryParams>;
  taskUpdateRepository: ITaskRepository<ITaskUpdateRepositoryParams>;
  taskToggleStatus: ITaskRepository<ITaskUpdateStatusRepositoryParams>;
}

export interface ITaskServicesFactory {
  taskCreate(): ICreateTask;
  taskDelete(): IDeleteTask;
  taskUpdate(): IUpdateTask;
  taskList(): ITaskList;
  taskInfo(): ITaskInfo;
  toggleTaskStatus(): ITaskUpdateStatus;
}

export interface ITaskServices {
  get(): Promise<TaskModel[]>;
  getInfo(taskId: ITaskInfoDTO): Promise<TaskModel>;
  create(data: ICreateTaskDTO): Promise<TaskModel>;
  update(data: IUpdateTaskDTO): Promise<TaskModel>;
  delete(taskId: IDeleteTaskDTO): Promise<void>;
  toggleStatusTask(data: ITaskUpdateStatusDTO): Promise<TaskModel>;
}
