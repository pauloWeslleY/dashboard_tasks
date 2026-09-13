import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { type TaskModel } from '@/data/models/task.model';

export function useGetTaskId(enabled = true, taskId?: string | null) {
  const {
    data: getTask,
    isError: isErrorTask,
    isLoading: isLoadingTask,
  } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await axios.get<TaskModel>(
        `/api/tasks/${taskId}`
      );
      return response.data;
    },
    enabled: !!taskId && enabled,
  });

  return {
    getTask,
    isError: isErrorTask,
    isLoading: isLoadingTask,
  };
}
