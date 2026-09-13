import { type FirebaseError } from 'firebase/app';

import { ErrorHandler } from './error-handler';

export class AppError extends Error {
  constructor(private readonly firebaseError: FirebaseError) {
    super();
    this.error();
  }

  error(): Error {
    const hasError = new ErrorHandler();
    const error = hasError.errorHandler(this.firebaseError.code);
    throw new Error(error?.message);
  }
}
