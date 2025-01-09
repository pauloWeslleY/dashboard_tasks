'use client';

import React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/app/_components/core/logo';
import { paths } from '@/main/paths';
import { useStateAuth } from '@/main/store/ducks/authentication';
import { useStateMenuNav } from '@/main/store/ducks/menu-nav';
import { useAppSelector } from '@/main/store/hooks/use-redux';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { loadNavItems } from './config';
import { renderNavItems } from './render-nav-items';

export function SideNav(): React.JSX.Element {
  const { data: loadUser } = useAppSelector(useStateAuth);
  const menuNav = useAppSelector(useStateMenuNav);
  const pathname = usePathname();

  return (
    <Box
      sx={{
        '--SideNav-background': 'var(--mui-palette-neutral-950)',
        '--SideNav-color': 'var(--mui-palette-common-white)',
        '--NavItem-color': 'var(--mui-palette-neutral-300)',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
        '--NavItem-active-background': 'var(--mui-palette-primary-main)',
        '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
        '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
        '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
        bgcolor: 'var(--SideNav-background)',
        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        scrollbarWidth: 'none',
        position: 'fixed',
        maxWidth: '100%',
        left: menuNav ? '0px' : '-140px',
        top: 0,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        transition: 'width 0.2s ease-in-out',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Stack spacing={2} sx={{ padding: 3 }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
          <Logo color="light" height={32} width={122} />
        </Box>

        <Stack
          direction="column"
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 2,
          }}
        >
          <Avatar src="/assets/avatar.png" sx={{ width: 55, height: 55 }} />

          {loadUser && (
            <Box sx={{ textAlign: 'center', display: 'block' }}>
              <Typography variant="subtitle1">{loadUser.username}</Typography>
              <Typography color="text.secondary" variant="body2">
                {loadUser.email}
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>

      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />

      <Box component="nav" sx={{ flex: '1 1 auto', padding: '12px' }}>
        {renderNavItems({ pathname, items: loadNavItems })}
      </Box>
    </Box>
  );
}
