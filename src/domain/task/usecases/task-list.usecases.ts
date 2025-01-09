import { type CollectionsType, type IFirebase } from '@/infra/services/firebase';
import { query } from 'firebase/firestore';

import { type TaskModel } from '@/data/models/task.model';
import { type ITaskList } from '@/data/usecases';

import { type ITaskListRepository } from '../repositories/task-list.repository';

interface ITaskListDependencies {
  database: IFirebase;
  collection: CollectionsType;
  taskListRepository: ITaskListRepository;
}

export class TaskList implements ITaskList {
  private database: IFirebase;
  private collection: CollectionsType;
  private taskListRepository: ITaskListRepository;

  constructor(protected readonly dependencies: ITaskListDependencies) {
    this.database = dependencies.database;
    this.collection = dependencies.collection;
    this.taskListRepository = dependencies.taskListRepository;
  }

  async exec(): Promise<TaskModel[]> {
    const taskQuery = query(this.database.collection(this.collection));
    const task = await this.taskListRepository.getTaskList(taskQuery);
    return task;
  }
}
