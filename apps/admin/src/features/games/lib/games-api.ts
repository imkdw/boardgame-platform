import { fetchApi } from '@/lib/api';
import type { StoreGame, ApiResponse } from '@repo/types';
import type { CreateGameDto, UpdateGameDto } from '../types';

export async function getGames(storeId: string): Promise<StoreGame[]> {
  const response = await fetchApi<ApiResponse<StoreGame[]>>(`/stores/${storeId}/games`);
  return response.data;
}

export async function getGame(storeId: string, gameId: string): Promise<StoreGame> {
  const response = await fetchApi<ApiResponse<StoreGame>>(`/stores/${storeId}/games/${gameId}`);
  return response.data;
}

export async function createGame(storeId: string, data: CreateGameDto): Promise<StoreGame> {
  const response = await fetchApi<ApiResponse<StoreGame>>(`/stores/${storeId}/games`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function updateGame(storeId: string, gameId: string, data: UpdateGameDto): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}/games/${gameId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteGame(storeId: string, gameId: string): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}/games/${gameId}`, {
    method: 'DELETE',
  });
}
