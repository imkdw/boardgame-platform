import { STORE_EXCEPTION_CODES } from './store-exception-codes';
import { USER_EXCEPTION_CODES } from './user-exception-codes';

export const EXCEPTION_CODES = {
  ...USER_EXCEPTION_CODES,
  ...STORE_EXCEPTION_CODES,
} as const;

export type ExceptionCode = (typeof EXCEPTION_CODES)[keyof typeof EXCEPTION_CODES];
