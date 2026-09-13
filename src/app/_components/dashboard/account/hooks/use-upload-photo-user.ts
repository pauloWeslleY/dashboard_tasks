import { type ChangeEvent } from 'react';
import {
  setFile,
  useStateUploadFile,
} from '@/main/store/ducks/upload-file';
import {
  useAppDispatch,
  useAppSelector,
} from '@/main/store/hooks/use-redux';

import { type UseUploadPhotoUserProps } from '../types';

export function useUploadPhotoUser(): UseUploadPhotoUserProps {
  const { prevUrl } = useAppSelector(useStateUploadFile);
  const dispatch = useAppDispatch();

  function handlerInputChangeFile(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    const file = event.target.files;
    dispatch(setFile(file));
  }

  return {
    prevFile: prevUrl,
    handlerInputChangeFile,
  };
}
