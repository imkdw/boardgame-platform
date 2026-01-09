export type GameDifficulty = 'easy' | 'medium' | 'hard';
export type GameSortBy = 'recommended' | 'popular' | 'name' | 'difficulty';
export type GameGenre =
  | '전략'
  | '파티'
  | '추리'
  | '협동'
  | '블러핑'
  | '숫자'
  | '퍼즐'
  | '순발력'
  | '그림'
  | '상상력'
  | '단어'
  | '팀전'
  | '자원'
  | '보석'
  | '서부'
  | '기차'
  | 'SF';
export type PlayTimeRange = '30' | '60' | '60+';
export type PlayerCount = '2' | '3' | '4' | '5+';

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
  genres: string[];
  isAvailable: boolean;
  isRecommended: boolean;
  stock: number;
  availableStock: number;
  description: string;
  rules: string;
  videoUrl?: string;
}
