import { plainToInstance } from 'class-transformer';
import { RoomSession } from '@prisma/client';
import { RoomSessionDto, TimePlanSummaryDto } from '../dto/room-session.dto';
import { RoomSessionWithTimePlan } from '../types/room-session.types';

export function toRoomSessionDto(session: RoomSession): RoomSessionDto {
  return plainToInstance(RoomSessionDto, {
    id: session.id,
    storeId: session.storeId,
    roomId: session.roomId,
    timePlanId: session.timePlanId,
    peopleCount: session.peopleCount,
    status: session.status,
    startedAt: session.startedAt,
    endedAt: session.endedAt,
    scheduledEndAt: session.scheduledEndAt,
    totalPrice: session.totalPrice,
  } satisfies RoomSessionDto);
}

export function toRoomSessionDtoWithTimePlan(session: RoomSessionWithTimePlan): RoomSessionDto {
  return plainToInstance(RoomSessionDto, {
    id: session.id,
    storeId: session.storeId,
    roomId: session.roomId,
    timePlanId: session.timePlanId,
    peopleCount: session.peopleCount,
    status: session.status,
    startedAt: session.startedAt,
    endedAt: session.endedAt,
    scheduledEndAt: session.scheduledEndAt,
    totalPrice: session.totalPrice,
    timePlan: plainToInstance(TimePlanSummaryDto, {
      id: session.timePlan.id,
      name: session.timePlan.name,
      durationMinutes: session.timePlan.durationMinutes,
    } satisfies TimePlanSummaryDto),
  } satisfies RoomSessionDto);
}
