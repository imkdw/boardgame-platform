export const SSE_EVENT_TYPES = {
  /**
   * 방 상태 변경 이벤트
   */
  ROOM_STATUS_CHANGED: 'room-status-changed',

  /**
   * 연결 유지용 heartbeat 이벤트
   */
  HEARTBEAT: 'heartbeat',
} as const;

export type SseEventType = (typeof SSE_EVENT_TYPES)[keyof typeof SSE_EVENT_TYPES];
