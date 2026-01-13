import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator, StoreRoomValidator } from '@repo/server-shared';
import { RoomSessionNotFoundException, RoomSessionAlreadyEndedException } from '@repo/server-shared';
import { STORE_ROOM_STATUS, ROOM_SESSION_STATUS } from '@repo/consts';
import { RoomSessionDto } from '../dto/room-session.dto';
import { toRoomSessionDto } from '../mapper/room-session.mapper';
import { RoomStatusEventService } from '../../../_sse/room-status-event.service';

@Injectable()
export class EndRoomSessionUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeRoomValidator: StoreRoomValidator,
    private readonly roomStatusEventService: RoomStatusEventService,
  ) {}

  async execute(storeId: string, roomId: string, sessionId: string): Promise<RoomSessionDto> {
    await this.storeValidator.checkExist(storeId);
    await this.storeRoomValidator.checkExist(storeId, roomId);

    const session = await this.prisma.roomSession.findFirst({
      where: { id: sessionId, storeId, roomId },
    });

    if (!session) {
      throw new RoomSessionNotFoundException('세션을 찾을 수 없습니다');
    }

    if (session.status !== ROOM_SESSION_STATUS.ACTIVE) {
      throw new RoomSessionAlreadyEndedException('세션이 이미 종료되었습니다');
    }

    const updatedSession = await this.prisma.$transaction(async (tx) => {
      const ended = await tx.roomSession.update({
        where: { id: sessionId },
        data: {
          status: ROOM_SESSION_STATUS.COMPLETED,
          endedAt: new Date(),
        },
      });

      await tx.storeRoom.update({
        where: { id: roomId },
        data: { status: STORE_ROOM_STATUS.AVAILABLE },
      });

      return ended;
    });

    // 트랜잭션 커밋 후 SSE 이벤트 발행
    this.roomStatusEventService.emit(storeId, {
      roomId,
      status: STORE_ROOM_STATUS.AVAILABLE,
      sessionId: null,
    });

    return toRoomSessionDto(updatedSession);
  }
}
