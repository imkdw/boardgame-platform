import { createFetchApi } from '@repo/electron-shared';

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:4000/v1';

export const fetchApi = createFetchApi({
  baseUrl: API_BASE_URL,
  defaultTimeout: 15000,
});
