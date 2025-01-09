import type store from '@/main/store/store';

export type RootStateProps = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
