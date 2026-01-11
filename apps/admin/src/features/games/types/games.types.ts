import type { GameDifficulty } from '@repo/types';

export interface CreateGameDto {
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

export interface UpdateGameDto {
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
