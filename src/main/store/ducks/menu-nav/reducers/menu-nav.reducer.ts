import { type RootStateProps } from '@/main/store/types/redux.types';
import { createSlice } from '@reduxjs/toolkit';

const menuNavSlice = createSlice({
  name: 'menu-nav',
  initialState: false,
  reducers: {
    setMenuNavState: (_, action) => action.payload,
    setMenuNav: (state) => !state,
  },
});

export const { setMenuNav, setMenuNavState } = menuNavSlice.actions;
export const menuNavReducer = menuNavSlice.reducer;
export const useStateMenuNav = (state: RootStateProps): boolean =>
  state.menuNav;
