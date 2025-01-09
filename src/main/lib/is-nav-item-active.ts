import type { NavItemConfig } from '@/app/_components/types/nav';
import { VERIFY_PATHNAME, type VerifyPathnameType } from '@/app/_components/types/verify-pathname.type';

type IsNavItemActiveProps = Pick<NavItemConfig, 'disabled' | 'external' | 'href' | 'matcher'> & {
  pathname: string;
};

export function isNavItemActive({ disabled, external, href, matcher, pathname }: IsNavItemActiveProps): boolean {
  if (disabled || !href || external) return false;

  if (matcher) {
    const hasVerifyPathname: Record<VerifyPathnameType, boolean> = {
      [VERIFY_PATHNAME.STARTS_WITH]: pathname.startsWith(matcher.href),
      [VERIFY_PATHNAME.EQUALS]: pathname === matcher.href,
    };

    return hasVerifyPathname[matcher.type] ?? false;
  }

  return pathname === href;
}
