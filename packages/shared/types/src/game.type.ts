import type { GameDifficulty, GameGenre } from '@repo/consts';

export type { GameDifficulty, GameGenre } from '@repo/consts';

export interface StoreGame {
  id: string;
  storeId: string;
  name: string;
  thumbnail: string | null;
  images: string[];
  minPlayers: number;
  maxPlayers: number;
  playTime: number;
  difficulty: GameDifficulty;
  genres: string[];
  isRecommended: boolean;
  stock: number;
  availableStock: number;
  description: string;
  rules: string;
  videoUrl: string | null;
}

export interface GameItem {
  id: string;
  name: string;
  thumbnail?: string;
  images?: string[];
  minPlayers: number;
  maxPlayers: number;
  playTime: number;
  difficulty: GameDifficulty;
  genres: GameGenre[];
  category?: string;
  description?: string;
  rules?: string;
  videoUrl?: string;
  stock: number;
  availableStock: number;
  isAvailable: boolean;
  isRecommended?: boolean;
}

export interface GameStockDetail {
  totalCount: number;
  availableCount: number;
  rentedCount: number;
  repairCount: number;
}

export type GameItemWithStock = GameItem & GameStockDetail;
