export interface ReducerStateType {
  readonly error: Error | string | null;
  readonly isError: boolean;
  readonly isSuccess: boolean;
  readonly isLoading: boolean;
}
