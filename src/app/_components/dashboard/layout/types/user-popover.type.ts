import { type PopoverProps } from '@mui/material/Popover';

export interface UserPopoverProps extends PopoverProps {
  onCloseMenuItem: () => void;
}
