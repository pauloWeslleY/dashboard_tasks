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
import { useUpdateStatusTaskMutation } from './use-update-status-task-mutation';

export function useTaskTable() {
  const [pageTask, setPageTask] = useState<number>(0);
  const [rowsPerPageTask, setRowsPerPageTask] = useState<number>(5);
  const { updateStatusTask } = useUpdateStatusTaskMutation();
  const {
    data: getTasks = [],
    error: errorTasks,
    isError: isErrorTasks,
    isLoading: isLoadingTasks,
  } = useGetTasks();

  const taskIds = useMemo<string[]>(
    () => getTasks.map((task) => task.id),
    [getTasks]
  );

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(taskIds);

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
    selected.forEach((taskId) => {
      updateStatusTask({ id: taskId, status });
    });
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
