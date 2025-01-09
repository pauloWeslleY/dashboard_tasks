// TODO: Repository
export { type ITaskListRepository, TaskListRepository } from './repositories/task-list.repository';
export { type ITaskCreateRepositoryParams, TaskCreateRepository } from './repositories/task-create.repository';
export { type ITaskUpdateRepositoryParams, TaskUpdateRepository } from './repositories/task-update.repository';
export { type ITaskDetailsRepository, TaskDetailsRepository } from './repositories/task-details.repository';
export { type ITaskDeleteRepository, TaskDeleteRepository } from './repositories/task-delete.repository';
export {
  type ITaskUpdateStatusRepositoryParams,
  TaskUpdateStatusRepository,
} from './repositories/task-update-status.repository';

// TODO: Usecases
export { CreateTask } from './usecases/create-task.usecases';
export { UpdateTask } from './usecases/update-task.usecases';
export { TaskDelete } from './usecases/task-delete.usecases';
export { TaskList } from './usecases/task-list.usecases';
export { TaskInfo } from './usecases/task-info.usecases';
export { TaskUpdateStatus } from './usecases/task-update-status.usecases';

// FIXME: Interfaces
export type { ITaskRepository } from './repositories/task-repository.interface';
