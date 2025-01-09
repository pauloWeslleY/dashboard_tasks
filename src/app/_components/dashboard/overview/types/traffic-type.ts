import type { SxProps, Theme } from '@mui/material/styles';

export interface TrafficProps {
  chartSeries: number[];
  labels: string[];
  sx?: SxProps<Theme>;
}
