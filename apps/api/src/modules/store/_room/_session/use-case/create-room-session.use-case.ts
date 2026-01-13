import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator, StoreRoomValidator } from '@repo/server-shared';
import {
  RoomAlreadyInUseException,
  StoreTimePlanNotFoundException,
} from '@repo/server-shared';
import { STORE_ROOM_STATUS, ROOM_SESSION_STATUS } from '@repo/consts';
import { CreateRoomSessionDto } from '../dto/create-room-session.dto';
import { RoomSessionDto } from '../dto/room-session.dto';
import { toRoomSessionDtoWithTimePlan } from '../mapper/room-session.mapper';
import { RoomStatusEventService } from '../../../_sse/room-status-event.service';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateRoomSessionUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeRoomValidator: StoreRoomValidator,
    private readonly roomStatusEventService: RoomStatusEventService,
  ) {}

  async execute(storeId: string, roomId: string, dto: CreateRoomSessionDto): Promise<RoomSessionDto> {
    await this.storeValidator.checkExist(storeId);
    const room = await this.storeRoomValidator.checkExist(storeId, roomId);

    if (room.status !== STORE_ROOM_STATUS.AVAILABLE) {
      throw new RoomAlreadyInUseException('해당 방은 이미 사용중입니다');
    }

    const timePlan = await this.prisma.storeTimePlan.findFirst({
      where: { id: dto.timePlanId, storeId, deletedAt: null },
    });

    if (!timePlan) {
      throw new StoreTimePlanNotFoundException('시간 플랜을 찾을 수 없습니다');
    }

    const totalPrice = timePlan.price * dto.peopleCount;
    const startedAt = new Date();
    const scheduledEndAt = new Date(startedAt.getTime() + timePlan.durationMinutes * 60 * 1000);

    const sessionId = randomUUID();

    const session = await this.prisma.$transaction(async (tx) => {
      const createdSession = await tx.roomSession.create({
        data: {
          id: sessionId,
          storeId,
          roomId,
          timePlanId: dto.timePlanId,
          peopleCount: dto.peopleCount,
          status: ROOM_SESSION_STATUS.ACTIVE,
          startedAt,
          scheduledEndAt,
          totalPrice,
        },
        include: { timePlan: true },
      });

      await tx.storeRoom.update({
        where: { id: roomId },
        data: { status: STORE_ROOM_STATUS.IN_USE },
      });

      return createdSession;
    });

    // 트랜잭션 커밋 후 SSE 이벤트 발행
    this.roomStatusEventService.emit(storeId, {
      roomId,
      status: STORE_ROOM_STATUS.IN_USE,
      sessionId: session.id,
    });

    return toRoomSessionDtoWithTimePlan(session);
  }
}
