import * as React from 'react';
import type { Metadata } from 'next';
import { GuestGuard } from '@/app/_components/auth/guest-guard';
import { Layout } from '@/app/_components/auth/layout';
import { ResetPasswordForm } from '@/app/_components/auth/reset-password-form';
import { config } from '@/main/config';

export const metadata = {
  title: `Reset password | Auth | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <ResetPasswordForm />
      </GuestGuard>
    </Layout>
  );
}
