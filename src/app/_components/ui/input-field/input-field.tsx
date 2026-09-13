import React, { forwardRef, type ComponentProps } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput, {
  type OutlinedInputProps,
} from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

type InputFieldType = OutlinedInputProps & {
  label: string;
  error?: boolean;
  helperText?: string;
  errorText?: string;
} & ComponentProps<'input'>;

const StyledFormHelperText = styled(FormHelperText, {
  name: 'FormText',
  slot: 'root',
})(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
}));

export const InputField = forwardRef<
  HTMLInputElement,
  InputFieldType
>(
  (
    {
      label = '',
      name = '',
      helperText = '',
      errorText = '',
      error = false,
      sx,
      ...props
    },
    ref
  ) => {
    return (
      <FormControl sx={sx} error={error} size="small">
        <InputLabel htmlFor={name}>{label}</InputLabel>

        <OutlinedInput
          ref={ref}
          {...props}
          label={label}
          name={name}
        />

        {helperText && (
          <StyledFormHelperText>{helperText}</StyledFormHelperText>
        )}

        {errorText && (
          <StyledFormHelperText error={error}>
            {errorText}
          </StyledFormHelperText>
        )}
      </FormControl>
    );
  }
);

InputField.displayName = 'InputField';
