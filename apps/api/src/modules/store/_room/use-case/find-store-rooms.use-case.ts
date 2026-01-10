import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { StoreRoomDto } from '../dto/store-room.dto';
import { toStoreRoomDto } from '../mapper/store-room.mapper';

@Injectable()
export class FindStoreRoomsUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator
  ) {}

  async execute(storeId: string): Promise<StoreRoomDto[]> {
    await this.storeValidator.checkExist(storeId);

    const rooms = await this.prisma.storeRoom.findMany({
      where: { storeId, deletedAt: null },
      orderBy: { roomNumber: 'asc' },
    });

    return rooms.map(toStoreRoomDto);
  }
}
