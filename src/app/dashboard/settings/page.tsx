import React from 'react';
import type { Metadata } from 'next';
import { Notifications } from '@/app/_components/dashboard/settings/notifications';
import { UpdatePasswordForm } from '@/app/_components/dashboard/settings/update-password-form';
import { config } from '@/main/config';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const metadata = {
  title: `Settings | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Settings</Typography>
      </div>

      <Notifications />

      <UpdatePasswordForm />
    </Stack>
  );
}
