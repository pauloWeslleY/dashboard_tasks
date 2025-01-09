import { type SxProps, type Theme } from '@mui/material/styles';

export interface Order {
  id: string;
  customer: {
    name: string;
  };
  amount: number;
  status: 'pending' | 'delivered' | 'refunded';
  createdAt: Date;
}

export interface LatestOrdersProps {
  orders?: Order[];
  sx?: SxProps<Theme>;
}
