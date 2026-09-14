import { type ChangeEvent } from 'react';
import { type SelectOptionsProps } from '@/app/_components/types/select-options.type';
import { type SelectChangeEvent } from '@mui/material/Select';
import { debounce, parseAsString, useQueryStates } from 'nuqs';

import { STATUS_TASK } from '../components/table-task-rows/types';

export function useTaskFilter() {
  const [taskFilter, setTaskFilter] = useQueryStates(
    {
      q: parseAsString.withDefault(''),
      status: parseAsString.withDefault(''),
      category: parseAsString.withDefault(''),
    },
    {
      history: 'push',
    }
  );

  const loadSelectTaskStatus: SelectOptionsProps[] = [
    { value: STATUS_TASK.DONE as string, name: 'Completada' },
    { value: STATUS_TASK.NOT_DONE as string, name: 'Pendente' },
  ];

  function handlerChangeInputTaskFilterCategory(
    event: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>
  ) {
    setTaskFilter({ category: event.target.value as string });
  }

  function handlerChangeInputTaskFilterStatus(
    event: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>
  ) {
    setTaskFilter({ status: event.target.value as string });
  }

  function handlerChangeInputTaskFilterDescription(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setTaskFilter(
      { q: event.target.value },
      {
        limitUrlUpdates:
          event.target.value !== '' ? debounce(500) : undefined,
      }
    );
  }

  return {
    loadSelectTaskStatus,
    taskFilter,
    handlerChangeInputTaskFilterStatus,
    handlerChangeInputTaskFilterCategory,
    handlerChangeInputTaskFilterDescription,
  };
}
