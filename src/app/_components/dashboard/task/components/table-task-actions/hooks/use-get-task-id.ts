import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { type TaskModel } from '@/data/models/task.model';

export function useGetTaskId() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');

  const {
    data: getTask,
    isError: isErrorTask,
    isLoading: isLoadingTask,
  } = useQuery({
    queryKey: ['task'],
    queryFn: async () => {
      const response = await axios.get<TaskModel>(
        `/api/tasks/${taskId}`
      );
      return response.data;
    },
    enabled: !!taskId,
  });

  return {
    getTask,
    isError: isErrorTask,
    isLoading: isLoadingTask,
  };
}
