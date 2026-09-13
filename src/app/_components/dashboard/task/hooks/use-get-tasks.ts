import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TaskModel } from '@/data/models/task.model';

export function useGetTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await axios.get<TaskModel[]>('/api/tasks');
      return response.data;
    },
  });
}
