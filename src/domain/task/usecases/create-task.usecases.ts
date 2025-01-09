import { type IDayJsAdapter } from '@/infra/adapters/dayjs';
import { COLLECTION, type IFirebase } from '@/infra/services/firebase';
import { doc } from 'firebase/firestore';

import { type TaskModel } from '@/data/models/task.model';
import { type ICreateTask, type ICreateTaskDTO } from '@/data/usecases';

import { TaskFactory } from '../entities/task.factory';
import { type ITaskCreateRepositoryParams } from '../repositories/task-create.repository';
import { type ITaskRepository } from '../repositories/task-repository.interface';
import { taskAdapter } from './task-adapter';

interface ICreateTaskDependencies {
  taskRepository: ITaskRepository<ITaskCreateRepositoryParams>;
  database: IFirebase;
  date: IDayJsAdapter;
}

export class CreateTask implements ICreateTask {
  private taskRepository: ITaskRepository<ITaskCreateRepositoryParams>;
  private database: IFirebase;
  private date: IDayJsAdapter;

  constructor(protected readonly dependencies: ICreateTaskDependencies) {
    this.database = dependencies.database;
    this.taskRepository = dependencies.taskRepository;
    this.date = dependencies.date;
  }

  async execCreateTask(data: ICreateTaskDTO): Promise<TaskModel> {
    const taskDoc = doc(this.database.collection(COLLECTION.tasks));
    const auth = this.database.auth();
    const userAuthenticated = auth.currentUser;

    if (!userAuthenticated) throw new Error('User not authenticated');

    const newTask = TaskFactory.task({
      id: taskDoc.id,
      ownerId: userAuthenticated.uid,
      name: data.nameTask,
      description: data.descriptionTask,
      category: data.categoryTask,
    });

    await this.taskRepository.save({ taskDoc, task: newTask });

    return taskAdapter({ task: newTask, date: this.date });
  }
}
