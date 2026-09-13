import React, { forwardRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';

import {
  InputPasswordType,
  type InputPasswordProps,
  type PasswordType,
} from './input-password.type';

const StyledFormHelperText = styled(FormHelperText, {
  name: 'FormText',
  slot: 'root',
})(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
}));

export const InputPassword = forwardRef<
  HTMLSelectElement,
  InputPasswordProps
>(function InputPassword(
  {
    id = '',
    label = '',
    name = '',
    helperText = '',
    errorText = '',
    error = false,
    ...props
  },
  ref
): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const InputPasswordIcon: Record<PasswordType, React.ReactElement> =
    {
      [InputPasswordType.PASSWORD]: (
        <EyeSlashIcon
          cursor="pointer"
          fontSize="var(--icon-fontSize-md)"
          onClick={(): void => {
            setShowPassword(true);
          }}
        />
      ),
      [InputPasswordType.TEXT]: (
        <EyeIcon
          cursor="pointer"
          fontSize="var(--icon-fontSize-md)"
          onClick={(): void => {
            setShowPassword(false);
          }}
        />
      ),
    };

  return (
    <FormControl error={error} size="small">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        {...props}
        ref={ref}
        id={id}
        label={label}
        name={name}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          InputPasswordIcon[
            showPassword
              ? InputPasswordType.TEXT
              : InputPasswordType.PASSWORD
          ]
        }
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
});

InputPassword.displayName = 'InputPassword';
