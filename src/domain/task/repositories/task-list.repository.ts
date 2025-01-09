import { type IDayJsAdapter } from '@/infra/adapters/dayjs';
import { FirebaseError } from 'firebase/app';
import { getDocs, type Query, type QueryDocumentSnapshot } from 'firebase/firestore';

import { AppError } from '@/data/errors/usecases/app-error';
import { type TaskModel } from '@/data/models/task.model';

import { type ITask } from '../entities/task.interface';
import { taskAdapter } from '../usecases/task-adapter';

export interface ITaskListRepository {
  getTaskList(taskSnapshot: Query<unknown>): Promise<TaskModel[]>;
}

export class TaskListRepository implements ITaskListRepository {
  private _task: ITask[];

  constructor(private readonly date: IDayJsAdapter) {
    this._task = [];
  }

  async getTaskList(taskSnapshot: Query<unknown>): Promise<TaskModel[]> {
    try {
      const taskListDoc = await getDocs(taskSnapshot);

      taskListDoc.forEach((doc: QueryDocumentSnapshot<unknown>) => {
        const task = {} as ITask;

        Object.assign(task, {
          ...(doc.data() as ITask),
          id: doc.id,
        });

        this._task.push(task);
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) throw new AppError(error);
    }

    return this._task.map((task) => taskAdapter({ task, date: this.date }));
  }
}
