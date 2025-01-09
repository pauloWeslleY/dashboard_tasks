import type { SxProps, Theme } from '@mui/material/styles';

export interface TotalCustomersProps {
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps<Theme>;
  value: string;
}
