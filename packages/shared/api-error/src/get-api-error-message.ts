import { EXCEPTION_MESSAGES } from '@repo/exception';
import { ApiError } from './api-error';

function isApiError(error: unknown): error is ApiError {
  return (
    error instanceof ApiError ||
    (error !== null &&
      typeof error === 'object' &&
      'name' in error &&
      error.name === 'ApiError' &&
      'errorCode' in error)
  );
}

export function getApiErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    const message = EXCEPTION_MESSAGES[error.errorCode as keyof typeof EXCEPTION_MESSAGES] as string | undefined;
    return message ?? '알 수 없는 오류가 발생했습니다.';
  }
  return error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
}
