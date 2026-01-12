import { fetchApi } from './api';
import type { ApiResponse, StoreGame } from '@repo/types';
import type { Game } from '@/features/games/types';
import type { GameGenre } from '@repo/consts';

export async function getStoreGames(storeId: string): Promise<Game[]> {
  const response = await fetchApi<ApiResponse<StoreGame[]>>(`/stores/${storeId}/games`);
  return response.data.map(storeGameToGame);
}

export async function getStoreGameById(storeId: string, gameId: string): Promise<Game> {
  const response = await fetchApi<ApiResponse<StoreGame>>(`/stores/${storeId}/games/${gameId}`);
  return storeGameToGame(response.data);
}

function storeGameToGame(storeGame: StoreGame): Game {
  return {
    id: storeGame.id,
    name: storeGame.name,
    nameEn: storeGame.name,
    thumbnail: storeGame.thumbnail ?? '',
    images: storeGame.images,
    minPlayers: storeGame.minPlayers,
    maxPlayers: storeGame.maxPlayers,
    playTime: storeGame.playTime,
    difficulty: storeGame.difficulty,
    genres: storeGame.genres as unknown as GameGenre[],
    isAvailable: storeGame.availableStock > 0,
    isRecommended: storeGame.isRecommended,
    stock: storeGame.stock,
    availableStock: storeGame.availableStock,
    description: storeGame.description,
    rules: storeGame.rules,
    videoUrl: storeGame.videoUrl ?? undefined,
  };
}
