import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TaskModel } from '@/data/models/task.model';

export function useGetTasks() {
  const searchParams = useSearchParams();
  const queryParams = {
    q: searchParams.get('q') ?? undefined,
    status: searchParams.get('status') ?? undefined,
    category: searchParams.get('category') ?? undefined,
  };

  return useQuery({
    queryKey: [
      'tasks',
      {
        q: queryParams.q ?? null,
        status: queryParams.status ?? null,
        category: queryParams.category ?? null,
      },
    ],
    queryFn: async () => {
      const response = await axios.get<TaskModel[]>('/api/tasks', {
        params: {
          ...queryParams,
        },
      });
      return response.data;
    },
  });
}
