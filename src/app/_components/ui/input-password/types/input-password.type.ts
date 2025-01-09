import { type ComponentProps } from 'react';
import { type OutlinedInputProps } from '@mui/material/OutlinedInput';

export type InputPasswordProps = OutlinedInputProps & {
  id: string;
  label: string;
  error?: boolean;
  helperText?: string;
} & ComponentProps<'input'>;

export enum INPUT_PASSWORD {
  TEXT = 'text',
  PASSWORD = 'password',
}

const Password = {
  [INPUT_PASSWORD.TEXT]: 'text',
  [INPUT_PASSWORD.PASSWORD]: 'password',
} as const;

export type PasswordType = (typeof Password)[keyof typeof Password];
