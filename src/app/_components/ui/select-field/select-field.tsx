import React, { forwardRef } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { type SelectFieldProps } from './types';

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ id, label, name, options, helperText, error, placeholder, sx, ...props }, ref) => {
    return (
      <FormControl size="small" error={error} sx={sx}>
        <InputLabel htmlFor={name} id={name}>
          {label}
        </InputLabel>
        <Select {...props} ref={ref} labelId={name} id={id} label={label} name={name}>
          <MenuItem value="">
            <em>{placeholder}</em>
          </MenuItem>

          {options.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            );
          })}
        </Select>

        {helperText && (
          <FormHelperText error={error} sx={{ fontSize: (theme) => theme.typography.pxToRem(14) }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

SelectField.displayName = 'SelectField';
