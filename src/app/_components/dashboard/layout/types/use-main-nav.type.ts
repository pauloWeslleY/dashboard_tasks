import { type PopoverController } from '@/app/hooks/use-popover';

export interface UseMainNavProps {
  menuNav: boolean;
  mainNav: boolean;
  userPopover: PopoverController<HTMLDivElement>;
  handlerToggleMenuNav(): void;
  handlerCloseMainNav(): void;
  handlerOpenMainNav(): void;
}
