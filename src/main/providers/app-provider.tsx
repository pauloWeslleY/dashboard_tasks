'use client';

import React, { type ReactNode } from 'react';
import { ThemeProvider } from '@/app/_components/core/theme-provider/theme-provider';
import store from '@/main/store/store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';

import 'dayjs/locale/pt-br';

const makeQueryClient = () => new QueryClient();

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="pt-br"
      >
        <QueryClientProvider client={makeQueryClient()}>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </Provider>
  );
}
