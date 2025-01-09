import { type ComponentProps } from 'react';
import { type SelectOptionsProps } from '@/app/_components/types/select-options.type';
import { type SelectProps } from '@mui/material/Select';
import { type SxProps, type Theme } from '@mui/material/styles';

export type SelectFieldProps = ComponentProps<'select'> & {
  id: string;
  label: string;
  sx?: SxProps<Theme>;
  error?: boolean;
  helperText?: string | undefined;
  options: SelectOptionsProps[];
} & SelectProps;
