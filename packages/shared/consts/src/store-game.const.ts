export const STORE_GAME_NAME_MAX_LENGTH = 100;
export const STORE_GAME_DESCRIPTION_MAX_LENGTH = 2000;
export const STORE_GAME_RULES_MAX_LENGTH = 2000;
export const STORE_GAME_MIN_PLAYERS = 1;
export const STORE_GAME_MAX_PLAYERS = 20;
export const STORE_GAME_MIN_PLAY_TIME = 1;
export const STORE_GAME_MAX_PLAY_TIME = 600;

export const GAME_DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export type GameDifficulty = (typeof GAME_DIFFICULTY)[keyof typeof GAME_DIFFICULTY];

export const GAME_DIFFICULTY_VALUES = Object.values(GAME_DIFFICULTY);

export const GAME_DIFFICULTY_ORDER: Record<GameDifficulty, number> = {
  [GAME_DIFFICULTY.EASY]: 1,
  [GAME_DIFFICULTY.MEDIUM]: 2,
  [GAME_DIFFICULTY.HARD]: 3,
};

export const PLAY_TIME_RANGE = {
  SHORT: '30',
  MEDIUM: '60',
  LONG: '60+',
} as const;

export type PlayTimeRange = (typeof PLAY_TIME_RANGE)[keyof typeof PLAY_TIME_RANGE];

export const PLAY_TIME_RANGE_VALUES = Object.values(PLAY_TIME_RANGE);

export const PLAY_TIME_RANGE_BOUNDS: Record<PlayTimeRange, { min?: number; max?: number }> = {
  [PLAY_TIME_RANGE.SHORT]: { max: 30 },
  [PLAY_TIME_RANGE.MEDIUM]: { min: 31, max: 60 },
  [PLAY_TIME_RANGE.LONG]: { min: 61 },
};

export const PLAYER_COUNT = {
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE_PLUS: '5+',
} as const;

export type PlayerCount = (typeof PLAYER_COUNT)[keyof typeof PLAYER_COUNT];

export const PLAYER_COUNT_VALUES = Object.values(PLAYER_COUNT);

export const PLAYER_COUNT_MIN_VALUE: Record<PlayerCount, number> = {
  [PLAYER_COUNT.TWO]: 2,
  [PLAYER_COUNT.THREE]: 3,
  [PLAYER_COUNT.FOUR]: 4,
  [PLAYER_COUNT.FIVE_PLUS]: 5,
};

export const GAME_GENRE = {
  STRATEGY: '전략',
  PARTY: '파티',
  MYSTERY: '추리',
  COOPERATION: '협동',
  BLUFFING: '블러핑',
  NUMBERS: '숫자',
  PUZZLE: '퍼즐',
  REFLEX: '순발력',
  DRAWING: '그림',
  IMAGINATION: '상상력',
  WORD: '단어',
  TEAM: '팀전',
  RESOURCE: '자원',
  GEM: '보석',
  WESTERN: '서부',
  TRAIN: '기차',
  SCI_FI: 'SF',
} as const;

export type GameGenre = (typeof GAME_GENRE)[keyof typeof GAME_GENRE];
export const GAME_GENRE_VALUES = Object.values(GAME_GENRE);

export const GAME_SORT_BY = {
  RECOMMENDED: 'recommended',
  POPULAR: 'popular',
  NAME: 'name',
  DIFFICULTY: 'difficulty',
} as const;

export type GameSortBy = (typeof GAME_SORT_BY)[keyof typeof GAME_SORT_BY];
export const GAME_SORT_BY_VALUES = Object.values(GAME_SORT_BY);
