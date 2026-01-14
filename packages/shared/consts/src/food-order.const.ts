/**
 * 음식 주문 상태
 */
export const FOOD_ORDER_STATUS = {
  /** 주문 대기 중 */
  PENDING: 'PENDING',
  /** 주문 확인됨 */
  CONFIRMED: 'CONFIRMED',
  /** 조리 중 */
  PREPARING: 'PREPARING',
  /** 조리 완료 - 서빙 대기 */
  READY: 'READY',
  /** 서빙 완료 */
  COMPLETED: 'COMPLETED',
  /** 주문 취소 */
  CANCELLED: 'CANCELLED',
} as const;

export type FoodOrderStatus = (typeof FOOD_ORDER_STATUS)[keyof typeof FOOD_ORDER_STATUS];

export const FOOD_ORDER_STATUS_VALUES = Object.values(FOOD_ORDER_STATUS);
