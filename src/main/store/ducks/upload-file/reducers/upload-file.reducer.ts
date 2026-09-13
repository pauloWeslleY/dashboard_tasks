import { type RootStateProps } from '@/main/store/types/redux.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type UploadFileStateType } from '../types/upload-file-state.type';

const UPLOAD_FILE_INITIAL_STATE = {
  file: null,
  prevUrl: '',
} satisfies UploadFileStateType as UploadFileStateType;

const listTypeFile = new Set(['image/jpeg', 'image/png']);

const uploadFileSlice = createSlice({
  name: 'upload-file',
  initialState: UPLOAD_FILE_INITIAL_STATE,
  reducers: {
    setFile: (state, action: PayloadAction<FileList | null>) => {
      if (!action.payload) {
        return state;
      }

      const fileSelected = action.payload[0];
      const validateFileType = listTypeFile.has(fileSelected.type);

      if (!validateFileType) {
        return { ...state, file: null };
      }

      return {
        file: fileSelected,
        prevUrl: URL.createObjectURL(fileSelected),
      };
    },
    setResetUploadFile: () => UPLOAD_FILE_INITIAL_STATE,
  },
});

export const { setFile, setResetUploadFile } =
  uploadFileSlice.actions;

export const uploadFileReducer = uploadFileSlice.reducer;

export const useStateUploadFile = (
  state: RootStateProps
): UploadFileStateType => state.uploadFile;
