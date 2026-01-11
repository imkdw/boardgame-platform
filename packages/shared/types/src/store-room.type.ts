import type { StoreRoomStatus } from '@repo/consts';

export interface StoreRoom {
  id: string;
  storeId: string;
  roomNumber: number;
  minCapacity: number;
  maxCapacity: number;
  description: string;
  status: StoreRoomStatus;
}
