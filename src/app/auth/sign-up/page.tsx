import * as React from 'react';
import type { Metadata } from 'next';
import { GuestGuard } from '@/app/_components/auth/guest-guard';
import { Layout } from '@/app/_components/auth/layout';
import { SignUpForm } from '@/app/_components/auth/sign-up-form';
import { config } from '@/main/config';

export const metadata = {
  title: `Sign up | Auth | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <SignUpForm />
      </GuestGuard>
    </Layout>
  );
}
