import { updateTaskStatusAction } from '@/server-action/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateStatusTaskMutation() {
  const queryClient = useQueryClient();
  const {
    mutate: updateStatusTask,
    isPending: isPendingUpdateStatusTask,
    isError: isErrorUpdateStatusTask,
    error: errorUpdateStatusTask,
  } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      updateTaskStatusAction(id, status),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      }
    },
  });

  return {
    updateStatusTask,
    isPendingUpdateStatusTask,
    isErrorUpdateStatusTask,
    errorUpdateStatusTask,
  };
}
