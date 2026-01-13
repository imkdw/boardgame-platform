import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator, StoreRoomValidator } from '@repo/server-shared';
import { RoomSessionNotFoundException } from '@repo/server-shared';
import { ROOM_SESSION_STATUS } from '@repo/consts';
import { RoomSessionDto } from '../dto/room-session.dto';
import { toRoomSessionDtoWithTimePlan } from '../mapper/room-session.mapper';

@Injectable()
export class FindActiveRoomSessionUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeRoomValidator: StoreRoomValidator,
  ) {}

  async execute(storeId: string, roomId: string): Promise<RoomSessionDto> {
    await this.storeValidator.checkExist(storeId);
    await this.storeRoomValidator.checkExist(storeId, roomId);

    const session = await this.prisma.roomSession.findFirst({
      where: {
        storeId,
        roomId,
        status: ROOM_SESSION_STATUS.ACTIVE,
      },
      include: { timePlan: true },
    });

    if (!session) {
      throw new RoomSessionNotFoundException('활성 세션을 찾을 수 없습니다');
    }

    return toRoomSessionDtoWithTimePlan(session);
  }
}
