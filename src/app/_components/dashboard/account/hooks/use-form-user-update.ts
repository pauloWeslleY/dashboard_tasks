import { useStateUploadFile } from '@/main/store/ducks/upload-file';
import { useAppSelector } from '@/main/store/hooks/use-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { UserUpdateSchema } from '../schemas';
import {
  type FormUserUpdateType,
  type UseFormUserUpdateProps,
} from '../types';
import { defaultValueFormUserUpdate } from './default-values-form-user-update';

export function useFormUserUpdate() {
  const { file } = useAppSelector(useStateUploadFile);
  const formUserUpdate = useForm<FormUserUpdateType>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: defaultValueFormUserUpdate,
  });
  const { errors, isSubmitting } = formUserUpdate.formState;

  function handlerUserUpdate(data: FormUserUpdateType): void {
    const userProfileData = {
      ...data,
      avatar: file,
    };

    console.log(userProfileData);
  }

  return {
    errors,
    isPendingUserUpdate: isSubmitting,
    control: formUserUpdate.control,
    handleSubmit: formUserUpdate.handleSubmit,
    handlerUserUpdate,
  };
}
