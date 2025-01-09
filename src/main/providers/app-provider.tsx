'use client';

import React, { type ReactNode } from 'react';
import { ThemeProvider } from '@/app/_components/core/theme-provider/theme-provider';
import store from '@/main/store/store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';

import 'dayjs/locale/pt-br';

import { UserLoggedProvider } from './user-logged-provider';

export function AppProvider({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <Provider store={store}>
      <UserLoggedProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <ThemeProvider>{children}</ThemeProvider>
        </LocalizationProvider>
      </UserLoggedProvider>
    </Provider>
  );
}
