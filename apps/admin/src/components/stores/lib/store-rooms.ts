import { fetchApi } from './api';
import type { StoreRoom, ApiResponse } from '@repo/types';
import type { CreateStoreRoomDto, UpdateStoreRoomDto } from './types';

export async function getStoreRooms(storeId: string): Promise<StoreRoom[]> {
  const response = await fetchApi<ApiResponse<StoreRoom[]>>(`/stores/${storeId}/rooms`);
  return response.data;
}

export async function getStoreRoom(storeId: string, roomId: string): Promise<StoreRoom> {
  const response = await fetchApi<ApiResponse<StoreRoom>>(`/stores/${storeId}/rooms/${roomId}`);
  return response.data;
}

export async function createStoreRoom(storeId: string, data: CreateStoreRoomDto): Promise<StoreRoom> {
  const response = await fetchApi<ApiResponse<StoreRoom>>(`/stores/${storeId}/rooms`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function updateStoreRoom(storeId: string, roomId: string, data: UpdateStoreRoomDto): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}/rooms/${roomId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteStoreRoom(storeId: string, roomId: string): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}/rooms/${roomId}`, {
    method: 'DELETE',
  });
}
