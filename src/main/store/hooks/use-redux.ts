import { type AppDispatch, type RootStateProps } from '@/main/store/types/redux.types';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

// TODO: Use em todo o seu aplicativo em vez de `useDispatch` e `useSelector` simples
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateProps> = useSelector;
