import React, { forwardRef, useState, type ReactElement } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';

import { INPUT_PASSWORD, type InputPasswordProps, type PasswordType } from './types';

export const InputPassword = forwardRef<HTMLSelectElement, InputPasswordProps>(
  ({ id = '', label = '', name = '', helperText = '', error = false, ...props }, ref): React.JSX.Element => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const InputPasswordIcon: Record<PasswordType, ReactElement> = {
      [INPUT_PASSWORD.PASSWORD]: (
        <EyeSlashIcon
          cursor="pointer"
          fontSize="var(--icon-fontSize-md)"
          onClick={(): void => {
            setShowPassword(true);
          }}
        />
      ),
      [INPUT_PASSWORD.TEXT]: (
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
          endAdornment={InputPasswordIcon[showPassword ? INPUT_PASSWORD.TEXT : INPUT_PASSWORD.PASSWORD]}
        />
        {helperText && (
          <FormHelperText error={error} sx={{ fontSize: (theme) => theme.typography.pxToRem(14) }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

InputPassword.displayName = 'InputPassword';
