export const ROOM_SESSION_STATUS = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export type RoomSessionStatus = (typeof ROOM_SESSION_STATUS)[keyof typeof ROOM_SESSION_STATUS];

export const ROOM_SESSION_STATUS_VALUES = Object.values(ROOM_SESSION_STATUS);

export const ROOM_SESSION_PEOPLE_COUNT_MIN = 1;
export const ROOM_SESSION_PEOPLE_COUNT_MAX = 20;
