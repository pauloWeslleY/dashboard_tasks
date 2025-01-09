import {
  TaskCreateRepository,
  TaskDeleteRepository,
  TaskDetailsRepository,
  TaskListRepository,
  TaskUpdateRepository,
  TaskUpdateStatusRepository,
  type ITaskCreateRepositoryParams,
  type ITaskDeleteRepository,
  type ITaskDetailsRepository,
  type ITaskListRepository,
  type ITaskRepository,
  type ITaskUpdateRepositoryParams,
  type ITaskUpdateStatusRepositoryParams,
} from '@/domain/task';
import { dateDayJsServices } from '@/main/factories/date-dayjs';

import { type ITaskRepositoryFactory } from '../types/task.services.type';

export class TaskRepositoriesFactory {
  private taskListRepository: ITaskListRepository;
  private taskToggleStatus: ITaskRepository<ITaskUpdateStatusRepositoryParams>;
  private taskDeleteRepository: ITaskDeleteRepository;
  private taskCreateRepository: ITaskRepository<ITaskCreateRepositoryParams>;
  private taskUpdateRepository: ITaskRepository<ITaskUpdateRepositoryParams>;
  private taskDetailRepository: ITaskDetailsRepository;

  constructor(protected readonly taskServicesDependencies: ITaskRepositoryFactory) {
    this.taskListRepository = taskServicesDependencies.taskListRepository;
    this.taskToggleStatus = taskServicesDependencies.taskToggleStatus;
    this.taskDeleteRepository = taskServicesDependencies.taskDeleteRepository;
    this.taskCreateRepository = taskServicesDependencies.taskCreateRepository;
    this.taskUpdateRepository = taskServicesDependencies.taskUpdateRepository;
    this.taskDetailRepository = taskServicesDependencies.taskDetailRepository;
  }

  get list(): ITaskListRepository {
    return this.taskListRepository;
  }

  get detail(): ITaskDetailsRepository {
    return this.taskDetailRepository;
  }

  get toggleStatus(): ITaskRepository<ITaskUpdateStatusRepositoryParams> {
    return this.taskToggleStatus;
  }

  get delete(): ITaskDeleteRepository {
    return this.taskDeleteRepository;
  }

  get create(): ITaskRepository<ITaskCreateRepositoryParams> {
    return this.taskCreateRepository;
  }

  get update(): ITaskRepository<ITaskUpdateRepositoryParams> {
    return this.taskUpdateRepository;
  }
}

export function makeTaskRepositories(): TaskRepositoriesFactory {
  return new TaskRepositoriesFactory({
    taskDeleteRepository: new TaskDeleteRepository(),
    taskCreateRepository: new TaskCreateRepository(),
    taskUpdateRepository: new TaskUpdateRepository(),
    taskToggleStatus: new TaskUpdateStatusRepository(),
    taskDetailRepository: new TaskDetailsRepository(dateDayJsServices),
    taskListRepository: new TaskListRepository(dateDayJsServices),
  });
}
