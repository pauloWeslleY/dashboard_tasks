export const VERIFY_PATHNAME = {
  STARTS_WITH: 'STARTS_WITH',
  EQUALS: 'EQUALS',
} as const;

export type VerifyPathnameType = (typeof VERIFY_PATHNAME)[keyof typeof VERIFY_PATHNAME];
