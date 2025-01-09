import { type Control, type FieldErrors, type UseFormHandleSubmit } from 'react-hook-form';

import { type FormUserUpdateType } from './form-user-update.type';

export interface UseFormUserUpdateProps {
  errors: FieldErrors<FormUserUpdateType>;
  control: Control<FormUserUpdateType>;
  handleSubmit: UseFormHandleSubmit<FormUserUpdateType>;
  handlerUserUpdate(data: FormUserUpdateType): void;
}
