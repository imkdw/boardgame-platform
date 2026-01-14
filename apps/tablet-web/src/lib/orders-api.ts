import type { ApiResponse, FoodOrder } from '@repo/types';
import { fetchApi } from './api';

export interface CreateFoodOrderItemDto {
  foodId: string;
  quantity: number;
}

export interface CreateFoodOrderDto {
  roomSessionId: string | null;
  roomNumber: number;
  items: CreateFoodOrderItemDto[];
}

export async function createFoodOrder(storeId: string, data: CreateFoodOrderDto): Promise<FoodOrder> {
  const response = await fetchApi<ApiResponse<FoodOrder>>(`/stores/${storeId}/food-orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.data;
}
