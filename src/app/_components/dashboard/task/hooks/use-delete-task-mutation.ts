import { deleteTaskAction } from '@/server-action/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteTask,
    isPending: isPendingDeleteTask,
    isError: isErrorDeleteTask,
    error: errorDeleteTask,
  } = useMutation({
    mutationFn: (taskId: string) => deleteTaskAction(taskId),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      }
    },
  });

  return {
    deleteTask,
    isPendingDeleteTask,
    isErrorDeleteTask,
    errorDeleteTask,
  };
}
