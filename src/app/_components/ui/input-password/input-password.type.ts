import { type ComponentProps } from 'react';
import { type OutlinedInputProps } from '@mui/material/OutlinedInput';

export type InputPasswordProps = OutlinedInputProps & {
  id: string;
  label: string;
  error?: boolean;
  helperText?: string;
  errorText?: string;
} & ComponentProps<'input'>;

export enum InputPasswordType {
  TEXT = 'text',
  PASSWORD = 'password',
}

const Password = {
  [InputPasswordType.TEXT]: 'text',
  [InputPasswordType.PASSWORD]: 'password',
} as const;

export type PasswordType = (typeof Password)[keyof typeof Password];
