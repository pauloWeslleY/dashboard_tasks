import { useCallback, useEffect } from 'react';
import { useError } from '@/app/hooks/use-error';
import { loadTaskList, useStateTask } from '@/main/store/ducks/task';
import { useAppDispatch, useAppSelector } from '@/main/store/hooks/use-redux';

import { type UseTaskListType } from '../types';

export function useTaskList(): UseTaskListType {
  const tasks = useAppSelector(useStateTask);
  const dispatch = useAppDispatch();
  const { errorMessage } = useError(tasks.error);

  const getTaskList = useCallback(() => {
    dispatch(loadTaskList());
  }, [dispatch]);

  useEffect(() => {
    getTaskList();
  }, [getTaskList]);

  return {
    loadTaskList: tasks.data ?? [],
    errorTasks: errorMessage,
    isErrorTasks: tasks.isError,
    isSuccessTasks: tasks.isSuccess,
    isLoadingTasks: tasks.isLoading,
    isPendingTasks: tasks.isPending,
  };
}
