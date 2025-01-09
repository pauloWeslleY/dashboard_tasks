import React, { type ReactNode } from 'react';
import Stack from '@mui/material/Stack';

import { type NavItemConfig } from '../../types/nav';
import { NavItem } from './nav-item';
import { type RenderNavItems } from './types';

export function renderNavItems({ items = [], pathname }: RenderNavItems): React.JSX.Element {
  const children = items.reduce((acc: ReactNode[], curr: NavItemConfig): ReactNode[] => {
    const { key, ...item } = curr;

    acc.push(<NavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {children}
    </Stack>
  );
}
