import { type IDayJsAdapter } from '@/infra/adapters/dayjs';

import { type TaskModel } from '@/data/models/task.model';

import { type ITask } from '../entities/task.interface';

interface TaskAdapterProps {
  task: ITask;
  date: IDayJsAdapter;
}

export function taskAdapter({ task, date }: TaskAdapterProps): TaskModel {
  return {
    ...task,
    createAt: date.formatDateAndHour({ date: task.createAt, hours: true }),
  };
}
