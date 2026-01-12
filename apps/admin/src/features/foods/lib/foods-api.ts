import { fetchApi } from '@/lib/api';
import type { StoreFood, ApiResponse } from '@repo/types';
import type { CreateFoodDto, UpdateFoodDto } from '../types';

export async function getFoods(storeId: string): Promise<StoreFood[]> {
  const response = await fetchApi<ApiResponse<StoreFood[]>>(`/stores/${storeId}/foods`);
  return response.data;
}

export async function getFoodsByCategory(storeId: string, categoryId: string): Promise<StoreFood[]> {
  const response = await fetchApi<ApiResponse<StoreFood[]>>(`/stores/${storeId}/food-categories/${categoryId}/foods`);
  return response.data;
}

export async function createFood(storeId: string, data: CreateFoodDto): Promise<StoreFood> {
  const response = await fetchApi<ApiResponse<StoreFood>>(`/stores/${storeId}/foods`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function updateFood(storeId: string, foodId: string, data: UpdateFoodDto): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}/foods/${foodId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteFood(storeId: string, foodId: string): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}/foods/${foodId}`, {
    method: 'DELETE',
  });
}
