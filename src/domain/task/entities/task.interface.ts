import { type Timestamp } from 'firebase/firestore';

export interface ITask {
  id: string;
  name: string;
  description: string;
  category: string;
  ownerId: string;
  status: boolean;
  createAt: Date | Timestamp;
}

export type TaskParams = Pick<ITask, 'id' | 'name' | 'description' | 'category' | 'ownerId'>;
