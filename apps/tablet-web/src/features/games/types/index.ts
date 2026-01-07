export type GameDifficulty = 'easy' | 'medium' | 'hard';
export type GameSortBy = 'recommended' | 'popular' | 'name' | 'difficulty';

export interface Game {
  id: string;
  name: string;
  nameEn: string;
  thumbnail: string;
  minPlayers: number;
  maxPlayers: number;
  playTime: number;
  difficulty: GameDifficulty;
  genres: string[];
  isAvailable: boolean;
  isRecommended: boolean;
  stock: number;
  availableStock: number;
}
