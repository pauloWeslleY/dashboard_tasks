export enum TASK_STATUS {
  DONE = 'DONE',
  NOT_DONE = 'NOT_DONE',
}

export type TaskStatusType = keyof typeof TASK_STATUS;

export const taskStatusValues = (
  taskStatus: boolean
): TaskStatusType => {
  return taskStatus ? TASK_STATUS.DONE : TASK_STATUS.NOT_DONE;
};
