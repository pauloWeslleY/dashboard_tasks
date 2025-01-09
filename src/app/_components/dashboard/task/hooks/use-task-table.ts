import { useMemo, useState, type ChangeEvent, type MouseEvent } from 'react';
import { tasks } from '@/app/database/task';
import { useSelection } from '@/app/hooks/use-selection';
import { loadTaskCreate, loadTaskToggleAll, useStateTaskFilter } from '@/main/store/ducks/task';
import { useAppDispatch, useAppSelector } from '@/main/store/hooks/use-redux';
import { type LabelDisplayedRowsArgs } from '@mui/material';

import { type TaskModel } from '@/data/models/task.model';

import { STATUS_TASK } from '../components/table-task-rows/types';
import { type ApplyTaskPaginationType, type SelectAllRowTaskTableType, type UseTasksTableProps } from '../types';
import { useTaskList } from './use-task-list';

export function useTaskTable(): UseTasksTableProps {
  const [pageTask, setPageTask] = useState<number>(0);
  const [rowsPerPageTask, setRowsPerPageTask] = useState<number>(5);
  const { loadTaskList, errorTasks, isErrorTasks, isSuccessTasks, isLoadingTasks, isPendingTasks } = useTaskList();
  const { taskDescription, taskCategory, taskStatus } = useAppSelector(useStateTaskFilter);

  const rowIds = useMemo(() => {
    return loadTaskList.map((task) => task.id);
  }, [loadTaskList]);

  const loadTaskListSearch = useMemo<TaskModel[]>(() => {
    const taskDescriptionRegexp = new RegExp(taskDescription, 'i');
    const taskCategoryRegexp = new RegExp(taskCategory, 'i');

    return loadTaskList.filter((task) => {
      const status: string = task.status ? STATUS_TASK.DONE : STATUS_TASK.NOT_DONE;
      const filteredNameDescriptions = `${task.name} ${task.description}`;
      const filteredStatusTask = taskStatus ? status === taskStatus : task;

      return (
        filteredNameDescriptions.match(taskDescriptionRegexp) &&
        task.category.match(taskCategoryRegexp) &&
        filteredStatusTask
      );
    });
  }, [loadTaskList, taskDescription, taskCategory, taskStatus]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);
  const dispatch = useAppDispatch();

  const selectedSize = selected?.size ?? 0;
  const selectedSome = selectedSize > 0 && selectedSize < loadTaskList.length;
  const selectedAll = loadTaskList.length > 0 && selectedSize === loadTaskList.length;
  const loadTaskTableHeader = ['Tarefa', 'Descrição', 'Categoria', 'Status'] satisfies string[];

  function handlerSelectAllRowTaskTable(event: ChangeEvent<HTMLInputElement>): void {
    event.target.checked ? selectAll() : deselectAll();
  }

  function handlerSelectRowTaskTable({ event, rowId }: SelectAllRowTaskTableType): void {
    event.target.checked ? selectOne(rowId) : deselectOne(rowId);
  }

  function applyPagination({ rows, page, rowsPerPage }: ApplyTaskPaginationType): TaskModel[] {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }

  // Handler para mudar a página
  function handlerPageChange(event: MouseEvent<HTMLButtonElement> | null, newPage: number): void {
    setPageTask(newPage);
  }

  // Handler para mudar o número de linhas por página
  function handlerRowsPerPageChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setRowsPerPageTask(parseInt(event.target.value, 10));
    setPageTask(0); // Reinicia para a primeira página ao mudar o número de linhas
  }

  function handlerToggleAllTask(status: boolean): void {
    dispatch(loadTaskToggleAll({ status }));
  }

  function noop(): void {
    // do nothing
  }

  function defaultLabelDisplayedRows({ from, to, count }: LabelDisplayedRowsArgs): string {
    return `${from} – ${to} de ${count !== -1 ? count : `more than ${to}`}`;
  }

  function createTasks(): void {
    tasks.forEach((props) => {
      const dataTask = {
        nameTask: props.name,
        descriptionTask: props.description,
        categoryTask: props.category,
      };

      dispatch(loadTaskCreate({ ...dataTask }));
    });
  }

  return {
    loadTaskList,
    errorTasks,
    isErrorTasks,
    isSuccessTasks,
    isLoadingTasks,
    isPendingTasks,
    selected,
    selectedAll,
    selectedSome,
    loadTaskTableHeader,
    noop,
    createTasks,
    handlerToggleAllTask,
    handlerSelectRowTaskTable,
    handlerSelectAllRowTaskTable,
    handlerPageChange,
    handlerRowsPerPageChange,
    defaultLabelDisplayedRows,
    page: pageTask,
    rowsPerPage: rowsPerPageTask,
    paginatedTasks: applyPagination({
      rows: loadTaskListSearch,
      page: pageTask,
      rowsPerPage: rowsPerPageTask,
    }),
  };
}
