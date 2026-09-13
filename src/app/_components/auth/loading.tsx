import React from 'react';
import Backdrop, { type BackdropProps } from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface AuthLoadingProps extends BackdropProps {
  message: string;
}

export function AuthLoading({ message, ...props }: AuthLoadingProps) {
  return (
    <Backdrop
      {...props}
      sx={(theme) => ({
        color: theme.palette.common.white,
        zIndex: theme.zIndex.drawer + 1,
      })}
    >
      <Box
        component={Paper}
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'primary.light',
          color: 'common.white',
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h4">{message}</Typography>
      </Box>
    </Backdrop>
  );
}
