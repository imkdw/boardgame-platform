import { fetchApi } from '@/lib/api';
import type { FoodOrder, ApiResponse } from '@repo/types';
import type { FoodOrderStatus } from '@repo/consts';

export async function getFoodOrders(storeId: string, status?: FoodOrderStatus): Promise<FoodOrder[]> {
  const queryParams = status ? `?status=${status}` : '';
  const response = await fetchApi<ApiResponse<FoodOrder[]>>(`/stores/${storeId}/food-orders${queryParams}`);
  return response.data;
}

export async function updateFoodOrderStatus(
  storeId: string,
  orderId: string,
  status: FoodOrderStatus
): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}/food-orders/${orderId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
