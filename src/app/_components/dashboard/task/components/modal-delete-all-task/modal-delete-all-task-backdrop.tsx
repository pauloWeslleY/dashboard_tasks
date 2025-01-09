import React, { forwardRef } from 'react';
import Fade from '@mui/material/Fade';

import { type ModelDeleteAllTaskBackdropProps } from './types';

export const ModalDeleteAllTaskBackdrop = forwardRef<HTMLDivElement, ModelDeleteAllTaskBackdropProps>((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

ModalDeleteAllTaskBackdrop.displayName = 'ModalDeleteTaskBackdrop';
