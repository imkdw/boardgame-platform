import type { ExceptionResponse } from '@repo/types';

export class ApiError extends Error {
  public apiStack?: unknown;

  constructor(
    public status: number,
    public errorCode: string,
    public path: string,
    apiStack?: unknown
  ) {
    super(`API Error: ${status} ${errorCode}`);
    this.name = 'ApiError';
    this.apiStack = apiStack;
  }

  static fromResponse(response: ExceptionResponse): ApiError {
    return new ApiError(response.statusCode, response.errorCode, response.path, response.stack);
  }
}
