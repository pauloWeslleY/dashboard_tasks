import { useState } from 'react';

import { type UseModalCreateTaskType } from '../types';

export function useModalCreateTask(): UseModalCreateTaskType {
  const [openModalCreateTask, setOpenModalCreateTask] = useState(false);

  function handleOpenModalCreateTask(): void {
    setOpenModalCreateTask(true);
  }

  function handleCloseModalCreateTask(): void {
    setOpenModalCreateTask(false);
  }

  return {
    openModalCreateTask,
    handleCloseModalCreateTask,
    handleOpenModalCreateTask,
  };
}
