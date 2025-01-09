import type { NavItemConfig } from '@/app/_components/types/nav';
import { paths } from '@/main/paths';

export const loadNavItems = [
  {
    key: 'overview',
    title: 'Overview',
    href: paths.dashboard.overview,
    icon: 'chart-pie',
  },
  {
    key: 'task',
    title: 'Task',
    href: paths.dashboard.tasks,
    icon: 'bookmark',
  },
  {
    key: 'integrations',
    title: 'Integrations',
    href: paths.dashboard.integrations,
    icon: 'plugs-connected',
  },
  {
    key: 'settings',
    title: 'Settings',
    href: paths.dashboard.settings,
    icon: 'gear-six',
  },
  {
    key: 'account',
    title: 'Account',
    href: paths.dashboard.account,
    icon: 'user',
  },
  {
    key: 'error',
    title: 'Error',
    href: paths.errors.notFound,
    icon: 'x-square',
  },
] satisfies NavItemConfig[];
