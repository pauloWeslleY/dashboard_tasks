import { useCallback, useRef, useState, type MutableRefObject } from 'react';

export interface PopoverController<T> {
  anchorRef: MutableRefObject<T | null>;
  handleOpen: () => void;
  handleClose: () => void;
  handleToggle: () => void;
  open: boolean;
}

export function usePopover<T = HTMLElement>(): PopoverController<T> {
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<T>(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return {
    open,
    anchorRef,
    handleOpen,
    handleClose,
    handleToggle,
  };
}
