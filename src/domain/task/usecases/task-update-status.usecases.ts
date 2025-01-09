import { COLLECTION, type IFirebase } from '@/infra/services/firebase';
import { doc } from 'firebase/firestore';

import { type TaskModel } from '@/data/models/task.model';
import { type ITaskUpdateStatus, type ITaskUpdateStatusDTO } from '@/data/usecases';

import { TaskFactory } from '../entities/task.factory';
import { type ITaskDetailsRepository } from '../repositories/task-details.repository';
import { type ITaskRepository } from '../repositories/task-repository.interface';
import { type ITaskUpdateStatusRepositoryParams } from '../repositories/task-update-status.repository';

interface ITaskUpdateStatusDependencies {
  taskRepository: ITaskRepository<ITaskUpdateStatusRepositoryParams>;
  taskDetails: ITaskDetailsRepository;
  database: IFirebase;
}

export class TaskUpdateStatus implements ITaskUpdateStatus {
  private taskRepository: ITaskRepository<ITaskUpdateStatusRepositoryParams>;
  private database: IFirebase;
  private taskDetails: ITaskDetailsRepository;

  constructor(protected readonly dependencies: ITaskUpdateStatusDependencies) {
    this.database = dependencies.database;
    this.taskRepository = dependencies.taskRepository;
    this.taskDetails = dependencies.taskDetails;
  }

  async toggleTaskStatus({ taskId, status }: ITaskUpdateStatusDTO): Promise<TaskModel> {
    const taskUpdateStatusDoc = doc(this.database.getDB(), COLLECTION.tasks, taskId);
    const taskInfo = await this.taskDetails.getTaskDetail(taskUpdateStatusDoc);

    const updateTaskStatus = TaskFactory.task({
      id: taskInfo.id,
      ownerId: taskInfo.ownerId,
      name: taskInfo.name,
      description: taskInfo.description,
      category: taskInfo.category,
    });

    updateTaskStatus.Status = status;

    await this.taskRepository.save({ taskDoc: taskUpdateStatusDoc, task: updateTaskStatus });

    return {
      ...updateTaskStatus,
      status: updateTaskStatus.status,
      createAt: taskInfo.createAt,
    } satisfies TaskModel;
  }
}
