'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/app/_components/core/logo';
import { authClient } from '@/infra/auth/auth-client';
import { paths } from '@/main/paths';
import { useAppSelector } from '@/main/store/hooks/use-redux';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { loadNavItems } from './config';
import { renderNavItems } from './render-nav-items';
import { type MobileNavProps } from './types';

export function MobileNav({
  open,
  onClose,
}: MobileNavProps): React.JSX.Element {
  const { data } = authClient.useSession();
  const pathname = usePathname();

  return (
    <Drawer
      PaperProps={{
        sx: {
          '--MobileNav-background': 'var(--mui-palette-neutral-950)',
          '--MobileNav-color': 'var(--mui-palette-common-white)',
          '--NavItem-color': 'var(--mui-palette-neutral-300)',
          '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
          '--NavItem-active-background':
            'var(--mui-palette-primary-main)',
          '--NavItem-active-color':
            'var(--mui-palette-primary-contrastText)',
          '--NavItem-disabled-color':
            'var(--mui-palette-neutral-500)',
          '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
          '--NavItem-icon-active-color':
            'var(--mui-palette-primary-contrastText)',
          '--NavItem-icon-disabled-color':
            'var(--mui-palette-neutral-600)',
          bgcolor: 'var(--MobileNav-background)',
          color: 'var(--MobileNav-color)',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          scrollbarWidth: 'none',
          width: 'var(--MobileNav-width)',
          zIndex: 'var(--MobileNav-zIndex)',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      }}
      onClose={onClose}
      open={open}
    >
      <div onMouseLeave={onClose}>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Box
            component={RouterLink}
            href={paths.home}
            sx={{ display: 'inline-flex' }}
          >
            <Logo color="light" height={32} width={122} />
          </Box>
          <Stack
            direction="column"
            spacing={2}
            useFlexGap
            sx={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Avatar
              src="/assets/avatar.png"
              sx={{ width: 55, height: 55 }}
            />
            {data && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1">
                  {data.user.name}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {data.user.email}
                </Typography>
              </Box>
            )}
          </Stack>
        </Stack>

        <Divider
          sx={{ borderColor: 'var(--mui-palette-neutral-700)' }}
        />

        <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
          {renderNavItems({ pathname, items: loadNavItems })}
        </Box>
      </div>
    </Drawer>
  );
}
