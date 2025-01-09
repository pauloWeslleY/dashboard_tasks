import { type NavItemConfig } from '@/app/_components/types/nav';

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
  items?: NavItemConfig[];
}
