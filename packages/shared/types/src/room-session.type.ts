import type { RoomSessionStatus, StoreRoomStatus } from '@repo/consts';

export interface TimePlanSummary {
  id: string;
  name: string;
  durationMinutes: number;
}

export interface RoomSession {
  id: string;
  storeId: string;
  roomId: string;
  timePlanId: string;
  peopleCount: number;
  status: RoomSessionStatus;
  startedAt: string;
  endedAt: string | null;
  scheduledEndAt: string;
  totalPrice: number;
  timePlan?: TimePlanSummary;
}

export interface RoomStatusEvent {
  roomId: string;
  status: StoreRoomStatus;
  sessionId: string | null;
}
