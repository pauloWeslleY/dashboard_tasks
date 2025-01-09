import { FirebaseError } from 'firebase/app';
import { deleteDoc, type DocumentReference } from 'firebase/firestore';

import { AppError } from '@/data/errors/usecases/app-error';

interface ITaskDeleteRepositoryParams {
  taskDoc: DocumentReference;
}

export interface ITaskDeleteRepository {
  delete(params: ITaskDeleteRepositoryParams): Promise<void>;
}

export class TaskDeleteRepository implements ITaskDeleteRepository {
  async delete({ taskDoc }: ITaskDeleteRepositoryParams): Promise<void> {
    try {
      await deleteDoc(taskDoc);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) throw new AppError(error);
    }
  }
}
