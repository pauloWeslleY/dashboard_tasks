import { CreateTask, TaskDelete, TaskInfo, TaskList, TaskUpdateStatus, UpdateTask } from '@/domain/task';
import { COLLECTION, DBFirebase } from '@/infra/services/firebase';
import { dateDayJsServices } from '@/main/factories/date-dayjs';

import {
  type ICreateTask,
  type IDeleteTask,
  type ITaskInfo,
  type ITaskList,
  type ITaskUpdateStatus,
  type IUpdateTask,
} from '@/data/usecases';

import { type ITaskServicesFactory } from '../types/task.services.type';
import { type TaskRepositoriesFactory } from './task.repositories.factory';

const database = DBFirebase.database();

export class TaskServicesFactory implements ITaskServicesFactory {
  constructor(private readonly taskRepositories: TaskRepositoriesFactory) {}

  taskCreate(): ICreateTask {
    return new CreateTask({
      database,
      taskRepository: this.taskRepositories.create,
      date: dateDayJsServices,
    });
  }

  taskUpdate(): IUpdateTask {
    return new UpdateTask({
      database,
      date: dateDayJsServices,
      taskRepository: this.taskRepositories.update,
    });
  }

  taskDelete(): IDeleteTask {
    return new TaskDelete(database, this.taskRepositories.delete);
  }

  taskList(): ITaskList {
    return new TaskList({
      database,
      taskListRepository: this.taskRepositories.list,
      collection: COLLECTION.tasks,
    });
  }

  taskInfo(): ITaskInfo {
    return new TaskInfo({
      database,
      taskDetails: this.taskRepositories.detail,
      collection: COLLECTION.tasks,
    });
  }

  toggleTaskStatus(): ITaskUpdateStatus {
    return new TaskUpdateStatus({
      database,
      taskRepository: this.taskRepositories.toggleStatus,
      taskDetails: this.taskRepositories.detail,
    });
  }
}
