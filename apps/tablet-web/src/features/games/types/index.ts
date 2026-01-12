import type { GameDifficulty, GameGenre, GameSortBy, PlayTimeRange, PlayerCount } from '@repo/consts';

export type { GameDifficulty, GameGenre, GameSortBy, PlayTimeRange, PlayerCount } from '@repo/consts';

export interface GameFiltersState {
  playerCount: PlayerCount | null;
  genres: GameGenre[];
  difficulty: GameDifficulty | null;
  playTimeRange: PlayTimeRange | null;
  availableOnly: boolean;
  recommendedOnly: boolean;
}

export const DEFAULT_FILTERS: GameFiltersState = {
  playerCount: null,
  genres: [],
  difficulty: null,
  playTimeRange: null,
  availableOnly: false,
  recommendedOnly: false,
};

export interface Game {
  id: string;
  name: string;
  nameEn: string;
  thumbnail: string;
  images: string[];
  minPlayers: number;
  maxPlayers: number;
  playTime: number;
  difficulty: GameDifficulty;
  genres: GameGenre[];
  isAvailable: boolean;
  isRecommended: boolean;
  stock: number;
  availableStock: number;
  description: string;
  rules: string;
  videoUrl?: string;
}
