import type { ApiResponse, StoreFood, StoreFoodCategory, StoreFoodCategoryItem } from '@repo/types';
import { fetchApi } from './api';
import type { StoreFoodData } from './types';

export type { StoreFoodData } from './types';

export async function getStoreFoods(storeId: string): Promise<StoreFood[]> {
  const response = await fetchApi<ApiResponse<StoreFood[]>>(`/stores/${storeId}/foods`);
  return response.data;
}

export async function getStoreFoodCategories(storeId: string): Promise<StoreFoodCategory[]> {
  const response = await fetchApi<ApiResponse<StoreFoodCategory[]>>(`/stores/${storeId}/food-categories`);
  return response.data;
}

export async function getCategoryFoods(storeId: string, categoryId: string): Promise<StoreFoodCategoryItem[]> {
  const response = await fetchApi<ApiResponse<StoreFoodCategoryItem[]>>(
    `/stores/${storeId}/food-categories/${categoryId}/foods`
  );
  return response.data;
}

export async function getStoreFoodData(storeId: string): Promise<StoreFoodData> {
  const categories = await getStoreFoodCategories(storeId);

  const foodsByCategory: Record<string, StoreFoodCategoryItem[]> = {};
  await Promise.all(
    categories.map(async category => {
      const foods = await getCategoryFoods(storeId, category.id);
      foodsByCategory[category.id] = foods;
    })
  );

  return { categories, foodsByCategory };
}
