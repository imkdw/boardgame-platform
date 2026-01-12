import type { GameFiltersState, GameSortBy } from '@/features/games/types';

export interface GetStoreGamesParams {
  search?: string;
  filters?: GameFiltersState;
  sortBy?: GameSortBy;
}
