import { type Timestamp } from 'firebase/firestore';

import { type ITask, type TaskParams } from './task.interface';

export class Task implements ITask {
  public id: string;
  public name: string;
  public description: string;
  public category: string;
  public ownerId: string;
  public status = false;
  public createAt: Date | Timestamp = new Date();

  constructor(props: TaskParams) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.category = props.category;
    this.ownerId = props.ownerId;
  }

  get Status(): boolean {
    return this.status;
  }

  set Status(status: boolean) {
    this.status = status;
  }
}
