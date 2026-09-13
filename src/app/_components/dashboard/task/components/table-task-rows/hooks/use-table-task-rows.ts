import { type TaskModel } from '@/data/models/task.model';

import { type UseTableTaskRows } from '../types';

export function useTableTaskRows({
  task,
}: {
  task: TaskModel;
}): UseTableTaskRows {
  const columnsTableTask = [
    { title: 'Name', content: task.name },
    { title: 'Description', content: task.description },
    { title: 'Category', content: task.category },
    { title: 'Status', content: task.status },
  ];

  return {
    columnsTableTask,
  };
}
