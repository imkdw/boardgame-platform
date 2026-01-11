import { fetchApi } from './api';
import type { Store, ApiResponse } from '@repo/types';
import type { CreateStoreDto, UpdateStoreDto } from '@/types';

export async function getStores(): Promise<Store[]> {
  const response = await fetchApi<ApiResponse<Store[]>>('/stores');
  return response.data;
}

export async function getStore(storeId: string): Promise<Store> {
  const response = await fetchApi<ApiResponse<Store>>(`/stores/${storeId}`);
  return response.data;
}

export async function createStore(data: CreateStoreDto): Promise<Store> {
  const response = await fetchApi<ApiResponse<Store>>('/stores', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function updateStore(storeId: string, data: UpdateStoreDto): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteStore(storeId: string): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}`, {
    method: 'DELETE',
  });
}
