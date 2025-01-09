import { type IDayJsAdapter } from '@/infra/adapters/dayjs';
import { FirebaseError } from 'firebase/app';
import { getDoc, type DocumentReference } from 'firebase/firestore';

import { AppError } from '@/data/errors/usecases/app-error';
import { type TaskModel } from '@/data/models/task.model';

import { type ITask } from '../entities/task.interface';
import { taskAdapter } from '../usecases/task-adapter';

export interface ITaskDetailsRepository {
  getTaskDetail(taskDoc: DocumentReference): Promise<TaskModel>;
}

export class TaskDetailsRepository implements ITaskDetailsRepository {
  private _task: ITask;

  constructor(private readonly date: IDayJsAdapter) {
    this._task = {} as ITask;
  }

  async getTaskDetail(taskDoc: DocumentReference): Promise<TaskModel> {
    try {
      const taskDetailDoc = await getDoc(taskDoc);
      const data = taskDetailDoc.data() as ITask;

      Object.assign(this._task, {
        ...data,
        id: taskDetailDoc.id,
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) throw new AppError(error);
    }

    return taskAdapter({ task: this._task, date: this.date });
  }
}
