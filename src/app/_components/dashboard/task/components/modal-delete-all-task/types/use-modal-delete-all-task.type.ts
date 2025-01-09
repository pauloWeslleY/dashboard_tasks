export interface UseModalDeleteAllTaskProps {
  openModalDeleteAllTask: boolean;
  isPendingTaskDelete: boolean;
  handlerDeleteAllTask(): void;
  onCloseModalDeleteAllTask(): void;
  handlerOpenModalDeleteAllTask(): void;
  handlerCloseModalDeleteAllTask(): void;
}
