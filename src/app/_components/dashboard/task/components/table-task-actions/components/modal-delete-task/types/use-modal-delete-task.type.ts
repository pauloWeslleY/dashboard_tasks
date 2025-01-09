import { type ModelDeleteProps } from './modal-delete.type';

export interface UseModalDeleteTaskProps {
  openModalDeleteTask: boolean;
  isPendingTaskDelete: boolean;
  handlerDeleteTask(): void;
  onCloseModalDeleteTask(): void;
  handlerOpenModalDeleteTask(): void;
  handlerCloseModalDeleteTask(): void;
}

export interface UseModalDeleteTaskParams extends ModelDeleteProps {}
