import { Injectable } from '@nestjs/common';
import { PrismaService, StoreRoomValidator, StoreValidator } from '@repo/server-shared';

@Injectable()
export class DeleteStoreRoomUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeRoomValidator: StoreRoomValidator
  ) {}

  async execute(storeId: string, roomId: string): Promise<void> {
    await this.storeValidator.checkExist(storeId);
    await this.storeRoomValidator.checkExist(storeId, roomId);

    await this.prisma.storeRoom.update({
      where: { id: roomId },
      data: { deletedAt: new Date() },
    });
  }
}
