import { fetchApi } from '@/lib/api';
import type { StoreTimePlan, ApiResponse } from '@repo/types';
import type { CreateStoreTimePlanDto, UpdateStoreTimePlanDto } from '../types';

export async function getStoreTimePlans(storeId: string): Promise<StoreTimePlan[]> {
  const response = await fetchApi<ApiResponse<StoreTimePlan[]>>(`/stores/${storeId}/time-plans`);
  return response.data;
}

export async function createStoreTimePlan(storeId: string, data: CreateStoreTimePlanDto): Promise<StoreTimePlan> {
  const response = await fetchApi<ApiResponse<StoreTimePlan>>(`/stores/${storeId}/time-plans`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function updateStoreTimePlan(
  storeId: string,
  planId: string,
  data: UpdateStoreTimePlanDto
): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}/time-plans/${planId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteStoreTimePlan(storeId: string, planId: string): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}/time-plans/${planId}`, {
    method: 'DELETE',
  });
}
