import { useState } from 'react';

import { type UseDialogUpdateTaskType } from '../types';

export function useDialogUpdateTask(): UseDialogUpdateTaskType {
  const [openDialogUpdateTask, setOpenDialogUpdateTask] = useState(false);

  function handlerOpenDialogUpdateTask(): void {
    setOpenDialogUpdateTask(true);
  }

  function handlerCloseDialogUpdateTask(): void {
    setOpenDialogUpdateTask(false);
  }

  return {
    openDialogUpdateTask,
    handlerCloseDialogUpdateTask,
    handlerOpenDialogUpdateTask,
  };
}
