import type { ApiResponse, Store } from '@repo/types';
import { fetchApi } from './api';

export async function getStoreByIp(ip: string): Promise<Store> {
  const response = await fetchApi<ApiResponse<Store>>('/stores/ip', {
    headers: {
      'X-Forwarded-For': ip,
    },
  });
  return response.data;
}

export async function getStoreById(storeId: string): Promise<Store> {
  const response = await fetchApi<ApiResponse<Store>>(`/stores/${storeId}`);
  return response.data;
}
