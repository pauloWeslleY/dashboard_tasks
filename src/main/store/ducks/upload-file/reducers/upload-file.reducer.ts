import { type RootStateProps } from '@/main/store/types/redux.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type UploadFileStateType } from '../types/upload-file-state.type';

export const UPLOAD_FILE_INITIAL_STATE = {
  file: null,
  prevUrl: '',
} satisfies UploadFileStateType as UploadFileStateType;

const uploadFileSlice = createSlice({
  name: 'upload-file',
  initialState: UPLOAD_FILE_INITIAL_STATE,
  reducers: {
    setFile: (state, action: PayloadAction<FileList | null>) => {
      if (action.payload) {
        const fileSelected = action.payload[0];

        if (fileSelected.type === 'image/jpeg' || fileSelected.type === 'image/png') {
          return {
            file: fileSelected,
            prevUrl: URL.createObjectURL(fileSelected),
          };
        }

        return { ...state, file: null };
      }

      return state;
    },
    setResetUploadFile: () => UPLOAD_FILE_INITIAL_STATE,
  },
});

export const { setFile, setResetUploadFile } = uploadFileSlice.actions;
export const uploadFileReducer = uploadFileSlice.reducer;
export function useStateUploadFile(state: RootStateProps): UploadFileStateType {
  return state.uploadFile;
}
