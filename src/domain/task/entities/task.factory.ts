import { Task } from './task';
import { type TaskParams } from './task.interface';

export class TaskFactory {
  static task(task: TaskParams): Task {
    return new Task(task);
  }
}
