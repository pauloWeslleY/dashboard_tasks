import type { SxProps, Theme } from '@mui/material/styles';

export interface ChartSeriesProps {
  name: string;
  data: number[];
}

export interface SalesProps {
  chartSeries: ChartSeriesProps[];
  sx?: SxProps<Theme>;
}
