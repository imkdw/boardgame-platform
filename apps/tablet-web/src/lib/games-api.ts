import { fetchApi } from './api';
import type { ApiResponse, StoreGame } from '@repo/types';
import type { Game } from '@/features/games/types';
import type { GameGenre } from '@repo/consts';
import { PLAY_TIME_RANGE_BOUNDS, PLAYER_COUNT_MIN_VALUE } from '@repo/consts';
import type { GetStoreGamesParams } from './types';

function buildQueryString(params: GetStoreGamesParams): string {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set('search', params.search);
  }

  if (params.sortBy) {
    searchParams.set('sortBy', params.sortBy);
  }

  if (params.filters) {
    const { playerCount, genres, difficulty, playTimeRange, availableOnly, recommendedOnly } = params.filters;

    if (playerCount) {
      const count = PLAYER_COUNT_MIN_VALUE[playerCount];
      searchParams.set('playerCount', String(count));
    }

    if (genres.length > 0) {
      genres.forEach(genre => searchParams.append('genres', genre));
    }

    if (difficulty) {
      searchParams.set('difficulty', difficulty);
    }

    if (playTimeRange) {
      const bounds = PLAY_TIME_RANGE_BOUNDS[playTimeRange];
      if (bounds.min !== undefined) {
        searchParams.set('minPlayTime', String(bounds.min));
      }
      if (bounds.max !== undefined) {
        searchParams.set('maxPlayTime', String(bounds.max));
      }
    }

    if (availableOnly) {
      searchParams.set('availableOnly', 'true');
    }

    if (recommendedOnly) {
      searchParams.set('recommendedOnly', 'true');
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

export async function getStoreGames(storeId: string, params: GetStoreGamesParams = {}): Promise<Game[]> {
  const queryString = buildQueryString(params);
  const response = await fetchApi<ApiResponse<StoreGame[]>>(`/stores/${storeId}/games${queryString}`);
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
