export const FOOD_ORDER_EXCEPTION_CODES = {
  FOOD_ORDER_NOT_FOUND: 'FOOD_ORDER-0001',
} as const;

type FoodOrderExceptionCode = (typeof FOOD_ORDER_EXCEPTION_CODES)[keyof typeof FOOD_ORDER_EXCEPTION_CODES];

export const FOOD_ORDER_EXCEPTION_MESSAGES: Record<FoodOrderExceptionCode, string> = {
  [FOOD_ORDER_EXCEPTION_CODES.FOOD_ORDER_NOT_FOUND]: '주문을 찾을 수 없습니다',
};
