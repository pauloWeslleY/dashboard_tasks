import { type ChangeEvent, type MouseEvent } from 'react';
import { type Selection } from '@/app/hooks/use-selection';
import { type LabelDisplayedRowsArgs } from '@mui/material';

import { type TaskModel } from '@/data/models/task.model';

import { type UseTaskListType } from './use-task-list.type';

export interface UseTasksTableParams {
  rows: TaskModel[];
}

export interface SelectAllRowTaskTableType {
  rowId: string;
  event: ChangeEvent<HTMLInputElement>;
}

export interface ApplyTaskPaginationType {
  rows: TaskModel[];
  page: number;
  rowsPerPage: number;
}

export type UseTasksTableProps = Pick<Selection, 'selected'> & {
  selectedAll: boolean;
  selectedSome: boolean;
  loadTaskTableHeader: string[];
  page: number;
  rowsPerPage: number;
  paginatedTasks: TaskModel[];
  noop(): void;
  createTasks(): void;
  defaultLabelDisplayedRows({ from, to, count }: LabelDisplayedRowsArgs): string;
  handlerPageChange(event: MouseEvent<HTMLButtonElement> | null, newPage: number): void;
  handlerRowsPerPageChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  handlerSelectRowTaskTable({ event, rowId }: SelectAllRowTaskTableType): void;
  handlerSelectAllRowTaskTable(event: ChangeEvent<HTMLInputElement>): void;
  handlerToggleAllTask(status: boolean): void;
} & UseTaskListType;
