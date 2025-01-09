import { type ChangeEvent } from 'react';
import { type SelectOptionsProps } from '@/app/_components/types/select-options.type';
import { type SelectChangeEvent } from '@mui/material/Select';

export interface UseCustomerFilterProps {
  loadSelectTaskStatus: SelectOptionsProps[];
  taskCategory: string;
  taskDescription: string;
  taskStatus: string;
  handlerChangeInputTaskFilterCategory(event: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>): void;
  handlerChangeInputTaskFilterStatus(event: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>): void;
  handlerChangeInputTaskFilterDescription(event: ChangeEvent<HTMLInputElement>): void;
}
