import { FirebaseError } from 'firebase/app';
import { setDoc, type DocumentReference } from 'firebase/firestore';

import { AppError } from '@/data/errors/usecases/app-error';

import { type ITask } from '../entities/task.interface';
import { type ITaskRepository } from './task-repository.interface';

export interface ITaskCreateRepositoryParams {
  task: ITask;
  taskDoc: DocumentReference;
}

export class TaskCreateRepository implements ITaskRepository<ITaskCreateRepositoryParams> {
  async save({ task, taskDoc }: ITaskCreateRepositoryParams): Promise<void> {
    try {
      const createTask = this.createTaskAdapter(task);

      await setDoc(taskDoc, { ...createTask });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) throw new AppError(error);
    }
  }

  private createTaskAdapter(task: ITask): Omit<ITask, 'id'> {
    return {
      name: task.name,
      description: task.description,
      category: task.category,
      ownerId: task.ownerId,
      status: task.status,
      createAt: task.createAt,
    };
  }
}
