import { fetchApi } from '@/lib/api';
import type { FoodCategory, ApiResponse } from '@repo/types';
import type { CreateFoodCategoryDto, UpdateFoodCategoryDto } from '../types';

export async function getFoodCategories(storeId: string): Promise<FoodCategory[]> {
  const response = await fetchApi<ApiResponse<FoodCategory[]>>(`/stores/${storeId}/food-categories`);
  return response.data;
}

export async function getFoodCategory(storeId: string, categoryId: string): Promise<FoodCategory> {
  const response = await fetchApi<ApiResponse<FoodCategory>>(`/stores/${storeId}/food-categories/${categoryId}`);
  return response.data;
}

export async function createFoodCategory(storeId: string, data: CreateFoodCategoryDto): Promise<FoodCategory> {
  const response = await fetchApi<ApiResponse<FoodCategory>>(`/stores/${storeId}/food-categories`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function updateFoodCategory(
  storeId: string,
  categoryId: string,
  data: UpdateFoodCategoryDto
): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}/food-categories/${categoryId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteFoodCategory(storeId: string, categoryId: string): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}/food-categories/${categoryId}`, {
    method: 'DELETE',
  });
}
