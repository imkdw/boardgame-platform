import { Injectable } from '@nestjs/common';
import { PrismaService, StoreRoomValidator, StoreValidator } from '@repo/server-shared';
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

    if (dto.roomNumber !== room.roomNumber) {
      await this.storeRoomValidator.checkExistRoomNumber(storeId, dto.roomNumber);
    }

    await this.prisma.storeRoom.update({
      where: { id: roomId },
      data: dto,
    });
  }
}
