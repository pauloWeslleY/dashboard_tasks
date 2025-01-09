import * as React from 'react';
import RouterLink from 'next/link';
import { paths } from '@/main/paths';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { useMenuPopover } from './hooks/use-menu-popover';
import { type UserPopoverProps } from './types';

export function UserPopover({ onCloseMenuItem, ...props }: UserPopoverProps): React.JSX.Element {
  const { loadUser, handlerSignOut } = useMenuPopover();

  return (
    <Popover
      {...props}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      slotProps={{
        paper: {
          onMouseLeave: onCloseMenuItem,
          sx: { width: '240px' },
        },
      }}
    >
      {loadUser && (
        <Box sx={{ p: '16px 20px' }}>
          <Typography variant="subtitle1">{loadUser.username}</Typography>
          <Typography color="text.secondary" variant="body2">
            {loadUser.email}
          </Typography>
        </Box>
      )}

      <Divider />

      <MenuList
        disablePadding
        sx={{
          p: '8px',
          '& .MuiMenuItem-root': {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem component={RouterLink} href={paths.dashboard.settings} onClick={onCloseMenuItem}>
          <ListItemIcon>
            <GearSixIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem component={RouterLink} href={paths.dashboard.account} onClick={onCloseMenuItem}>
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handlerSignOut}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
