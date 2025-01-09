import { type IDayJsAdapter } from '@/infra/adapters/dayjs';
import { COLLECTION, type IFirebase } from '@/infra/services/firebase';
import { doc } from 'firebase/firestore';

import { type TaskModel } from '@/data/models/task.model';
import { type IUpdateTask, type IUpdateTaskDTO } from '@/data/usecases';

import { TaskFactory } from '../entities/task.factory';
import { type ITaskRepository } from '../repositories/task-repository.interface';
import { type ITaskUpdateRepositoryParams } from '../repositories/task-update.repository';
import { taskAdapter } from './task-adapter';

interface IUpdateTaskDependencies {
  taskRepository: ITaskRepository<ITaskUpdateRepositoryParams>;
  database: IFirebase;
  date: IDayJsAdapter;
}

export class UpdateTask implements IUpdateTask {
  private taskRepository: ITaskRepository<ITaskUpdateRepositoryParams>;
  private database: IFirebase;
  private date: IDayJsAdapter;

  constructor(protected readonly dependencies: IUpdateTaskDependencies) {
    this.database = dependencies.database;
    this.taskRepository = dependencies.taskRepository;
    this.date = dependencies.date;
  }

  async execUpdateTask(data: IUpdateTaskDTO): Promise<TaskModel> {
    const taskUpdateDoc = doc(this.database.getDB(), COLLECTION.tasks, data.taskId);
    const auth = this.database.auth();
    const userAuthenticated = auth.currentUser;

    if (!userAuthenticated) throw new Error('User not authenticated');

    const updatedTask = TaskFactory.task({
      id: data.taskId,
      ownerId: userAuthenticated.uid,
      name: data.nameTask,
      description: data.descriptionTask,
      category: data.categoryTask,
    });

    await this.taskRepository.save({ taskDoc: taskUpdateDoc, task: updatedTask });

    return taskAdapter({ task: updatedTask, date: this.date });
  }
}
