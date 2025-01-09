export enum TASK_STATUS {
  DONE = 'DONE',
  NOT_DONE = 'NOT_DONE',
}

const TaskStatus = {
  [TASK_STATUS.DONE]: 'DONE',
  [TASK_STATUS.NOT_DONE]: 'NOT_DONE',
} as const;

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface TableTaskActionsType {
  taskId: string;
  taskStatus: boolean;
  isSelected: boolean;
}
