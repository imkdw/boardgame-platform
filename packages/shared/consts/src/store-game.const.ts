export const STORE_GAME_NAME_MAX_LENGTH = 100;
export const STORE_GAME_DESCRIPTION_MAX_LENGTH = 2000;
export const STORE_GAME_RULES_MAX_LENGTH = 2000;
export const STORE_GAME_MIN_PLAYERS = 1;
export const STORE_GAME_MAX_PLAYERS = 20;
export const STORE_GAME_MIN_PLAY_TIME = 1;
export const STORE_GAME_MAX_PLAY_TIME = 600;

export const GAME_DIFFICULTY = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
} as const;

export type GameDifficulty = (typeof GAME_DIFFICULTY)[keyof typeof GAME_DIFFICULTY];

export const GAME_DIFFICULTY_VALUES = Object.values(GAME_DIFFICULTY);
