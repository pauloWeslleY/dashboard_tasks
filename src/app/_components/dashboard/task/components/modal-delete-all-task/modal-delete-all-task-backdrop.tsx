import React, { forwardRef } from 'react';
import Fade from '@mui/material/Fade';

interface ModelDeleteAllTaskBackdropProps {
  open?: boolean;
}

export const ModalDeleteAllTaskBackdrop = forwardRef<
  HTMLDivElement,
  ModelDeleteAllTaskBackdropProps
>((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

ModalDeleteAllTaskBackdrop.displayName = 'ModalDeleteTaskBackdrop';
