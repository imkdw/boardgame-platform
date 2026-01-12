import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  StoreRoomValidator,
  StoreValidator,
  CannotUpdateInUseStoreStatusException,
} from '@repo/server-shared';
import { STORE_ROOM_STATUS } from '@repo/consts';
import { UpdateStoreRoomDto } from '../dto/update-store-room.dto';

@Injectable()
export class UpdateStoreRoomUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeRoomValidator: StoreRoomValidator
  ) {}

  async execute(storeId: string, roomId: string, dto: UpdateStoreRoomDto): Promise<void> {
    await this.storeValidator.checkExist(storeId);
    const room = await this.storeRoomValidator.checkExist(storeId, roomId);

    if (room.status === STORE_ROOM_STATUS.IN_USE && dto.status !== room.status) {
      throw new CannotUpdateInUseStoreStatusException(`사용중인 방은 상태 변경이 불가능함`);
    }

    if (dto.roomNumber !== room.roomNumber) {
      await this.storeRoomValidator.checkExistRoomNumber(storeId, dto.roomNumber);
    }

    await this.prisma.storeRoom.update({
      where: { id: roomId },
      data: dto,
    });
  }
}
