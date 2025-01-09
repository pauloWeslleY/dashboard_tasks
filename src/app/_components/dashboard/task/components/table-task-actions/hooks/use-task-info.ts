import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useError } from '@/app/hooks/use-error';
import { loadTaskInfo, useStateTaskInfo } from '@/main/store/ducks/task';
import { useAppDispatch, useAppSelector } from '@/main/store/hooks/use-redux';

import { type TaskModel } from '@/data/models/task.model';

import { type UseTaskInfoType } from '../types';

export function useTaskInfo(): UseTaskInfoType {
  const taskInfo = useAppSelector(useStateTaskInfo);
  const dispatch = useAppDispatch();
  const { errorMessage: errorTaskInfoMessage } = useError(taskInfo.error);
  const searchParamsTaskId = useSearchParams();

  const getTaskInfo = useCallback(() => {
    const taskId = searchParamsTaskId.get('taskId');
    if (!taskId) return;
    dispatch(loadTaskInfo({ taskId }));
  }, [dispatch, searchParamsTaskId]);

  useEffect(() => {
    getTaskInfo();
  }, [getTaskInfo]);

  return {
    loadTaskInfo: taskInfo.data ?? ({} as TaskModel),
    errorTaskInfoMessage,
    isError: taskInfo.isError,
    isLoading: taskInfo.isLoading,
    isSuccess: taskInfo.isSuccess,
  };
}
