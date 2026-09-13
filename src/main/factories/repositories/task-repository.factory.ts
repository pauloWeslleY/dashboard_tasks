import { db } from '@/infra/database';

import { type ITaskRepository } from '@/data/repositories/task-repository.interface';
import { TaskRepository } from '@/data/repositories/task.repository';

const makeTaskRepositoryFactory = (): ITaskRepository => {
  return new TaskRepository(db);
};

export const taskServices = makeTaskRepositoryFactory();
