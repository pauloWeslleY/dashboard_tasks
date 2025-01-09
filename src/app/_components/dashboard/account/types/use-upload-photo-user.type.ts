import { type ChangeEvent } from 'react';

export interface UseUploadPhotoUserProps {
  prevFile: string;
  handlerInputChangeFile(event: ChangeEvent<HTMLInputElement>): void;
}
