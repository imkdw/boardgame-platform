import { ApiError } from '@repo/api-error';
import type { ExceptionResponse } from '@repo/types';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

interface CreateFetchApiOptions {
  baseUrl: string;
  defaultTimeout?: number;
}

export function createFetchApi(options: CreateFetchApiOptions) {
  const { baseUrl, defaultTimeout = 10000 } = options;

  return async function fetchApi<T>(endpoint: string, fetchOptions: FetchOptions = {}): Promise<T> {
    const { timeout = defaultTimeout, ...restOptions } = fetchOptions;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...restOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '1.1.1.1',
          ...restOptions.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as ExceptionResponse | null;
        if (body) {
          throw ApiError.fromResponse(body);
        }
        throw new ApiError(response.status, 'UNKNOWN_ERROR', endpoint);
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };
}
