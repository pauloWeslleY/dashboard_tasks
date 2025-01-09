import { type TaskModel } from '@/data/models/task.model';

export function hasValidTaskAlreadyExists(tasks: TaskModel[], taskName: string): boolean {
  return tasks.some((task) => task.name === taskName);
}
