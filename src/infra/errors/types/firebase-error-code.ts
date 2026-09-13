export enum FirebaseErrorCode {
  USER_NOT_FOUND = 'auth/user-not-found',
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  EMAIL_ALREADY_EXISTS = 'auth/email-already-exists',
  INVALID_EMAIL = 'auth/invalid-email',
  INVALID_PASSWORD_WRONG = 'auth/wrong-password',
  INVALID_PASSWORD_WEAK = 'auth/weak-password',
  INVALID_PASSWORD = 'auth/invalid-password',
  TOO_MANY_REQUESTS = 'auth/too-many-requests',
  INVALID_CREDENTIAL = 'auth/invalid-credential',
  NETWORK_REQUEST_FAILED = 'auth/network-request-failed',
  UNEXPECTED_ERROR = 'unexpected-error',
  PERMISSION_DENIED = 'permission-denied',
}
