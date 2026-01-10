export const STORE_ROOM_DESCRIPTION_MAX_LENGTH = 500;
export const STORE_ROOM_NUMBER_MIN = 1;
export const STORE_ROOM_CAPACITY_MIN = 1;
export const STORE_ROOM_CAPACITY_MAX = 100;

export const STORE_ROOM_STATUS = {
  AVAILABLE: 'AVAILABLE',
  IN_USE: 'IN_USE',
  RESERVED: 'RESERVED',
  MAINTENANCE: 'MAINTENANCE',
} as const;

export type StoreRoomStatus = (typeof STORE_ROOM_STATUS)[keyof typeof STORE_ROOM_STATUS];

export const STORE_ROOM_STATUS_VALUES = Object.values(STORE_ROOM_STATUS);
