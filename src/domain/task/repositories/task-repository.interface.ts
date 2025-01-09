export interface ITaskRepository<T> {
  save(params: T): Promise<void>;
}
