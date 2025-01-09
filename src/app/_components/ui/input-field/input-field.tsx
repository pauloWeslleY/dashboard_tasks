import React, { forwardRef, type ComponentProps } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput, { type OutlinedInputProps } from '@mui/material/OutlinedInput';

type InputFieldType = OutlinedInputProps & {
  label: string;
  error?: boolean;
  helperText?: string | undefined;
} & ComponentProps<'input'>;

export const InputField = forwardRef<HTMLInputElement, InputFieldType>(
  ({ label = '', name = '', helperText = '', error = false, sx, ...props }, ref) => {
    return (
      <FormControl sx={sx} error={error} size="small">
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput ref={ref} {...props} label={label} name={name} />
        {helperText && (
          <FormHelperText error={error} sx={{ fontSize: (theme) => theme.typography.pxToRem(14) }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

InputField.displayName = 'InputField';
