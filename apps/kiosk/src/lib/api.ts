import { createFetchApi } from '@repo/electron-shared';

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:4000/v1';

// TODO: 프로덕션에서는 X-Forwarded-For 헤더 제거 필요 - 실제 IP를 사용하도록 변경
const MOCK_IP = '1.1.1.1';

export const fetchApi = createFetchApi({
  baseUrl: API_BASE_URL,
  defaultTimeout: 15000,
  defaultHeaders: {
    // TODO: 프로덕션에서 제거 필요
    'X-Forwarded-For': MOCK_IP,
  },
});
