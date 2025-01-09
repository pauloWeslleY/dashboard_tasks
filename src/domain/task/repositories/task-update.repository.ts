import { FirebaseError } from 'firebase/app';
import { updateDoc, type DocumentReference } from 'firebase/firestore';

import { AppError } from '@/data/errors/usecases/app-error';

import { type ITask } from '../entities/task.interface';
import { type ITaskRepository } from './task-repository.interface';

export interface ITaskUpdateRepositoryParams {
  task: ITask;
  taskDoc: DocumentReference;
}

export class TaskUpdateRepository implements ITaskRepository<ITaskUpdateRepositoryParams> {
  async save({ task, taskDoc }: ITaskUpdateRepositoryParams): Promise<void> {
    try {
      const updateTask = this.updateTaskAdapter({ task });

      await updateDoc(taskDoc, updateTask);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) throw new AppError(error);
    }
  }

  private updateTaskAdapter({ task }: { task: ITask }): Omit<ITask, 'id'> {
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
