import { type MouseEvent, type SyntheticEvent } from 'react';
import { type SnackbarCloseReason } from '@mui/material/Snackbar';

export namespace UseTableTaskActions {
  export interface Params {
    taskId: string;
    taskSelected: boolean;
    taskStatus: boolean;
  }

  export interface Type {
    openSnackbarTaskTableActions: boolean;
    anchorMenuElTaskTableActions: HTMLElement | null;
    openMenuTaskTableActions: boolean;
    handlerToggleTaskStatus(): void;
    handlerCloseMenuTaskTableActions(): void;
    handlerOpenMenuTaskTableActions(event: MouseEvent<HTMLElement>): void;
    handlerCloseSnackbarTaskTableActions(_event?: SyntheticEvent | Event, reason?: SnackbarCloseReason): void;
  }
}
