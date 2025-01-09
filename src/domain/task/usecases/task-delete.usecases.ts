import { COLLECTION, type IFirebase } from '@/infra/services/firebase';
import { doc } from 'firebase/firestore';

import { type IDeleteTask, type IDeleteTaskDTO } from '@/data/usecases';

import { type ITaskDeleteRepository } from '../repositories/task-delete.repository';

export class TaskDelete implements IDeleteTask {
  constructor(
    private readonly database: IFirebase,
    private readonly taskDeleteRepository: ITaskDeleteRepository
  ) {}

  async execDeleteTask({ taskId }: IDeleteTaskDTO): Promise<void> {
    const taskDoc = doc(this.database.getDB(), COLLECTION.tasks, taskId);
    await this.taskDeleteRepository.delete({ taskDoc });
  }
}
