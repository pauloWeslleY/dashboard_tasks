import { type SxProps, type Theme } from '@mui/material/styles';

export interface Product {
  id: string;
  image: string;
  name: string;
  updatedAt: Date;
}

export interface LatestProductsProps {
  products: Product[];
  sx: SxProps<Theme>;
}
