import { type ChangeEvent } from 'react';
import { type SelectOptionsProps } from '@/app/_components/types/select-options.type';
import { setTaskCategory, setTaskDescription, setTaskStatus, useStateTaskFilter } from '@/main/store/ducks/task';
import { useAppDispatch, useAppSelector } from '@/main/store/hooks/use-redux';
import { type SelectChangeEvent } from '@mui/material/Select';

import { STATUS_TASK } from '../components/table-task-rows/types';
import { type UseCustomerFilterProps } from '../types';

export function useTaskFilter(): UseCustomerFilterProps {
  const { taskCategory, taskDescription, taskStatus } = useAppSelector(useStateTaskFilter);
  const dispatch = useAppDispatch();

  const loadSelectTaskStatus: SelectOptionsProps[] = [
    { value: STATUS_TASK.DONE as string, name: 'Completada' },
    { value: STATUS_TASK.NOT_DONE as string, name: 'Pendente' },
  ];

  function handlerChangeInputTaskFilterCategory(
    event: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>
  ): void {
    dispatch(setTaskCategory(event.target.value as string));
  }

  function handlerChangeInputTaskFilterStatus(
    event: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>
  ): void {
    dispatch(setTaskStatus(event.target.value as string));
  }

  function handlerChangeInputTaskFilterDescription(event: ChangeEvent<HTMLInputElement>): void {
    dispatch(setTaskDescription(event.target.value));
  }

  return {
    loadSelectTaskStatus,
    taskStatus,
    taskCategory,
    taskDescription,
    handlerChangeInputTaskFilterStatus,
    handlerChangeInputTaskFilterCategory,
    handlerChangeInputTaskFilterDescription,
  };
}
