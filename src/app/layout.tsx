import React, { type ReactNode } from 'react';
import type { Viewport } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import './styles/global.css';

import { AppProvider } from '@/main/providers/app-provider';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
} satisfies Viewport;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({
  children,
}: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </AppProvider>
      </body>
    </html>
  );
}
