'use client';

import React, { type ReactNode } from 'react';
import { AuthGuard } from '@/app/_components/auth/auth-guard';
import { MainNav } from '@/app/_components/dashboard/layout/main-nav';
import { SideNav } from '@/app/_components/dashboard/layout/side-nav';
import { useStateAuth } from '@/main/store/ducks/authentication';
import { useStateMenuNav } from '@/main/store/ducks/menu-nav';
import { useAppSelector } from '@/main/store/hooks/use-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';

import { AuthLoading } from '../_components/auth/loading';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const menuNav = useAppSelector(useStateMenuNav);
  const userAuth = useAppSelector(useStateAuth);

  return (
    <AuthGuard>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': menuNav ? '280px' : '0px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <SideNav />
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            paddingLeft: {
              lg: 'var(--SideNav-width)',
            },
            transition: 'width 0.2s ease-in-out',
          }}
        >
          <MainNav />
          <main>
            <Container maxWidth="xl" sx={{ py: '64px' }}>
              {children}
            </Container>
          </main>
        </Box>
      </Box>

      <AuthLoading open={userAuth.isLoading} message="Carregando..." />
    </AuthGuard>
  );
}
