import { type TaskModel } from '@/data/models/task.model';
import {
  type ICreateTaskDTO,
  type IDeleteTaskDTO,
  type ITaskInfoDTO,
  type ITaskUpdateStatusDTO,
  type IUpdateTaskDTO,
} from '@/data/usecases';

import { type ITaskServices, type ITaskServicesFactory } from '../types/task.services.type';

export function servicesTask(task: ITaskServicesFactory): ITaskServices {
  async function createTask(data: ICreateTaskDTO): Promise<TaskModel> {
    const taskService = task.taskCreate();
    return await taskService.execCreateTask(data);
  }

  async function updateTask(data: IUpdateTaskDTO): Promise<TaskModel> {
    const taskService = task.taskUpdate();
    return await taskService.execUpdateTask(data);
  }

  async function deleteTask(taskId: IDeleteTaskDTO): Promise<void> {
    const taskService = task.taskDelete();
    await taskService.execDeleteTask(taskId);
  }

  async function toggleStatusTask(data: ITaskUpdateStatusDTO): Promise<TaskModel> {
    const taskService = task.toggleTaskStatus();
    return await taskService.toggleTaskStatus(data);
  }

  async function getTaskList(): Promise<TaskModel[]> {
    const taskService = task.taskList();
    return await taskService.exec();
  }

  async function getTaskInfo(taskId: ITaskInfoDTO): Promise<TaskModel> {
    const taskService = task.taskInfo();
    return await taskService.exec(taskId);
  }

  return {
    create: createTask,
    update: updateTask,
    delete: deleteTask,
    toggleStatusTask,
    get: getTaskList,
    getInfo: getTaskInfo,
  };
}
