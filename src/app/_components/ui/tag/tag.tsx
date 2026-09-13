import React from 'react';
import Box from '@mui/material/Box';
import Chip, { chipClasses } from '@mui/material/Chip';

import { type TagProps } from './types';

export function Tag({
  iconLeft: Icon,
  ...props
}: TagProps): React.JSX.Element {
  return (
    <Chip
      {...props}
      variant="filled"
      icon={<Box component={Icon} size={22} />}
      sx={(theme) => ({
        [`& .${chipClasses.label}`]: {
          fontSize: theme.typography.pxToRem(15.3),
          fontWeight: theme.typography.fontWeightMedium,
        },
      })}
    />
  );
}
