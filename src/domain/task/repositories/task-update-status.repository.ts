import { FirebaseError } from 'firebase/app';
import { updateDoc, type DocumentReference } from 'firebase/firestore';

import { AppError } from '@/data/errors/usecases/app-error';

import { type ITask } from '../entities/task.interface';
import { type ITaskRepository } from './task-repository.interface';

export interface ITaskUpdateStatusRepositoryParams {
  task: ITask;
  taskDoc: DocumentReference;
}

export class TaskUpdateStatusRepository implements ITaskRepository<ITaskUpdateStatusRepositoryParams> {
  async save({ task, taskDoc }: ITaskUpdateStatusRepositoryParams): Promise<void> {
    try {
      const updateTaskStatus = this.updateTaskStatusAdapter(task);

      await updateDoc(taskDoc, { ...updateTaskStatus });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) throw new AppError(error);
    }
  }

  private updateTaskStatusAdapter(task: ITask): Omit<ITask, 'id'> {
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
