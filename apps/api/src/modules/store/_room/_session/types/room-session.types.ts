import { RoomSession, StoreTimePlan } from '@prisma/client';

export type RoomSessionWithTimePlan = RoomSession & { timePlan: StoreTimePlan };
