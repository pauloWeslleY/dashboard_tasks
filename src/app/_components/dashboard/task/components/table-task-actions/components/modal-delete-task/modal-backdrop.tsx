import React, { forwardRef } from 'react';
import Fade from '@mui/material/Fade';

import { type ModelDeleteBackdropProps } from './types';

export const ModalDeleteTaskBackdrop = forwardRef<HTMLDivElement, ModelDeleteBackdropProps>((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

ModalDeleteTaskBackdrop.displayName = 'ModalDeleteTaskBackdrop';
