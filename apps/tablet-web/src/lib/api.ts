import { ApiError } from '@repo/api-error';
import { createFetchApi } from '@repo/web-shared';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/v1';

const fetchApi = createFetchApi({ baseUrl: API_BASE_URL });

export { fetchApi, ApiError };
