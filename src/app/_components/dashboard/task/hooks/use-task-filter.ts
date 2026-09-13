import { type ChangeEvent } from 'react';
import { type SelectOptionsProps } from '@/app/_components/types/select-options.type';
import { useAppDispatch } from '@/main/store/hooks/use-redux';
import { type SelectChangeEvent } from '@mui/material/Select';

import { STATUS_TASK } from '../components/table-task-rows/types';
import { type UseCustomerFilterProps } from '../types';

export function useTaskFilter(): UseCustomerFilterProps {
  const taskStatus: string = '';
  const taskCategory: string = '';
  const taskDescription: string = '';
  const dispatch = useAppDispatch();

  const loadSelectTaskStatus: SelectOptionsProps[] = [
    { value: STATUS_TASK.DONE as string, name: 'Completada' },
    { value: STATUS_TASK.NOT_DONE as string, name: 'Pendente' },
  ];

  function handlerChangeInputTaskFilterCategory(
    event: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>
  ): void {
    console.log(event.target.value as string);
  }

  function handlerChangeInputTaskFilterStatus(
    event: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>
  ): void {
    console.log(event.target.value as string);
  }

  function handlerChangeInputTaskFilterDescription(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    console.log(event.target.value as string);
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
