import { type RootStateProps } from '@/main/store/types/redux.types';
import { createSlice } from '@reduxjs/toolkit';

const menuNavSlice = createSlice({
  name: 'menu-nav',
  initialState: false,
  reducers: {
    setMenuNav: (state) => {
      return !state;
    },
  },
});

export const { setMenuNav } = menuNavSlice.actions;
export const menuNavReducer = menuNavSlice.reducer;
export function useStateMenuNav(state: RootStateProps): boolean {
  return state.menuNav;
}
