import {
  useMemo,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from 'react';
import { useSelection } from '@/app/hooks/use-selection';
import { type LabelDisplayedRowsArgs } from '@mui/material';

import { type TaskModel } from '@/data/models/task.model';

import {
  type ApplyTaskPaginationType,
  type SelectAllRowTaskTableType,
} from '../types';
import { useGetTasks } from './use-get-tasks';

export function useTaskTable() {
  const [pageTask, setPageTask] = useState<number>(0);
  const [rowsPerPageTask, setRowsPerPageTask] = useState<number>(5);
  const {
    data: getTasks = [],
    error: errorTasks,
    isError: isErrorTasks,
    isLoading: isLoadingTasks,
  } = useGetTasks();

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(getTasks.map((task) => task.id));

  // const loadTaskListSearch = useMemo<TaskModel[]>(() => {
  //   const taskDescriptionRegexp = new RegExp(taskDescription, 'i');
  //   const taskCategoryRegexp = new RegExp(taskCategory, 'i');

  //   return getTasks?.filter((task) => {
  //     const status: string = task.status
  //       ? STATUS_TASK.DONE
  //       : STATUS_TASK.NOT_DONE;
  //     const filteredNameDescriptions = `${task.name} ${task.description}`;

  //     const filteredStatusTask = taskStatus
  //       ? status === taskStatus
  //       : task;

  //     return (
  //       filteredNameDescriptions.match(taskDescriptionRegexp) &&
  //       task.category.match(taskCategoryRegexp) &&
  //       filteredStatusTask
  //     );
  //   });
  // }, [loadTaskList, taskDescription, taskCategory, taskStatus]);

  const selectedSize = selected?.size ?? 0;
  const selectedSome =
    selectedSize > 0 && selectedSize < getTasks.length;
  const selectedAll =
    getTasks.length > 0 && selectedSize === getTasks.length;

  const loadTaskTableHeader = [
    'Tarefa',
    'Descrição',
    'Categoria',
    'Status',
  ] satisfies string[];

  function handlerSelectAllRowTaskTable(
    event: ChangeEvent<HTMLInputElement>
  ) {
    event.target.checked ? selectAll() : deselectAll();
  }

  function handlerSelectRowTaskTable({
    event,
    rowId,
  }: SelectAllRowTaskTableType) {
    event.target.checked ? selectOne(rowId) : deselectOne(rowId);
  }

  function applyPagination({
    rows,
    page,
    rowsPerPage,
  }: ApplyTaskPaginationType): TaskModel[] {
    return rows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }

  // Handler para mudar a página
  function handlerPageChange(
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) {
    setPageTask(newPage);
  }

  // Handler para mudar o número de linhas por página
  function handlerRowsPerPageChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setRowsPerPageTask(parseInt(event.target.value, 10));
    setPageTask(0); // Reinicia para a primeira página ao mudar o número de linhas
  }

  function handlerToggleAllTask(status: boolean) {
    console.log(status);
  }

  function noop() {
    // do nothing
  }

  function defaultLabelDisplayedRows({
    from,
    to,
    count,
  }: LabelDisplayedRowsArgs) {
    return `${from} – ${to} de ${count !== -1 ? count : `more than ${to}`}`;
  }

  const paginatedTasks = applyPagination({
    rows: getTasks,
    page: pageTask,
    rowsPerPage: rowsPerPageTask,
  });

  return {
    getTasks,
    errorTasks,
    isErrorTasks,
    isLoadingTasks,
    selected,
    selectedAll,
    selectedSome,
    loadTaskTableHeader,
    noop,
    handlerToggleAllTask,
    handlerSelectRowTaskTable,
    handlerSelectAllRowTaskTable,
    handlerPageChange,
    handlerRowsPerPageChange,
    defaultLabelDisplayedRows,
    page: pageTask,
    rowsPerPage: rowsPerPageTask,
    paginatedTasks,
  };
}
