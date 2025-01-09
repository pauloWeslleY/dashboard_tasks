import { type NavItemConfig } from '@/app/_components/types/nav';

export interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname: string;
}
