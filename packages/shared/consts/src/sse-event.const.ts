export const SSE_EVENT_TYPES = {
  /**
   * 방 상태 변경 이벤트
   */
  ROOM_STATUS_CHANGED: 'room-status-changed',

  /**
   * 연결 유지용 heartbeat 이벤트
   */
  HEARTBEAT: 'heartbeat',

  /**
   * 새로운 음식 주문 생성 이벤트
   */
  FOOD_ORDER_CREATED: 'food-order-created',

  /**
   * 음식 주문 상태 변경 이벤트
   */
  FOOD_ORDER_STATUS_CHANGED: 'food-order-status-changed',
} as const;

export type SseEventType = (typeof SSE_EVENT_TYPES)[keyof typeof SSE_EVENT_TYPES];
