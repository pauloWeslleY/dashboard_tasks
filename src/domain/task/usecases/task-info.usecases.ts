import { type CollectionsType, type IFirebase } from '@/infra/services/firebase';
import { doc } from 'firebase/firestore';

import { type TaskModel } from '@/data/models/task.model';
import { type ITaskInfo, type ITaskInfoDTO } from '@/data/usecases';

import { type ITaskDetailsRepository } from '../repositories/task-details.repository';

interface ITaskInfoDependencies {
  database: IFirebase;
  collection: CollectionsType;
  taskDetails: ITaskDetailsRepository;
}

export class TaskInfo implements ITaskInfo {
  private database: IFirebase;
  private collection: CollectionsType;
  private taskDetails: ITaskDetailsRepository;

  constructor(protected readonly dependencies: ITaskInfoDependencies) {
    this.database = dependencies.database;
    this.collection = dependencies.collection;
    this.taskDetails = dependencies.taskDetails;
  }

  async exec({ taskId }: ITaskInfoDTO): Promise<TaskModel> {
    const taskInfoDoc = doc(this.database.getDB(), this.collection, taskId);
    return await this.taskDetails.getTaskDetail(taskInfoDoc);
  }
}
