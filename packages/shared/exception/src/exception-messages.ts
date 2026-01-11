import { USER_EXCEPTION_MESSAGES } from './user-exception-codes';
import { STORE_EXCEPTION_MESSAGES } from './store-exception-codes';
import { STORE_FOOD_EXCEPTION_MESSAGES } from './store-food-exception-codes';
import { STORE_FOOD_CATEGORY_EXCEPTION_MESSAGES } from './store-food-category-exception-codes';
import { STORE_GAME_EXCEPTION_MESSAGES } from './store-game-exception-codes';
import { STORE_ROOM_EXCEPTION_MESSAGES } from './store-room-exception-codes';

export const EXCEPTION_MESSAGES = {
  ...USER_EXCEPTION_MESSAGES,
  ...STORE_EXCEPTION_MESSAGES,
  ...STORE_FOOD_EXCEPTION_MESSAGES,
  ...STORE_FOOD_CATEGORY_EXCEPTION_MESSAGES,
  ...STORE_GAME_EXCEPTION_MESSAGES,
  ...STORE_ROOM_EXCEPTION_MESSAGES,
} as const;
