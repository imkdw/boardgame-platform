import { STORE_EXCEPTION_CODES } from './store-exception-codes';
import { STORE_FOOD_EXCEPTION_CODES } from './store-food-exception-codes';
import { STORE_FOOD_CATEGORY_EXCEPTION_CODES } from './store-food-category-exception-codes';
import { STORE_ROOM_EXCEPTION_CODES } from './store-room-exception-codes';
import { USER_EXCEPTION_CODES } from './user-exception-codes';

export const EXCEPTION_CODES = {
  ...USER_EXCEPTION_CODES,
  ...STORE_EXCEPTION_CODES,
  ...STORE_FOOD_EXCEPTION_CODES,
  ...STORE_FOOD_CATEGORY_EXCEPTION_CODES,
  ...STORE_ROOM_EXCEPTION_CODES,
} as const;

export type ExceptionCode = (typeof EXCEPTION_CODES)[keyof typeof EXCEPTION_CODES];
