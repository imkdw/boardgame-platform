import { Injectable } from '@nestjs/common';
import { StoreRoom } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ExistStoreRoomNumberException, StoreRoomNotFoundException } from '../exception';

@Injectable()
export class StoreRoomValidator {
  constructor(private readonly prisma: PrismaService) {}

  async checkExist(storeId: string, roomId: string): Promise<StoreRoom> {
    const room = await this.prisma.storeRoom.findFirst({
      where: { id: roomId, storeId, deletedAt: null },
    });

    if (!room) {
      throw new StoreRoomNotFoundException(`StoreRoom with id ${roomId} not found`);
    }

    return room;
  }

  async checkExistRoomNumber(storeId: string, roomNumber: number): Promise<void> {
    const existing = await this.prisma.storeRoom.findFirst({
      where: { storeId, roomNumber, deletedAt: null },
    });

    if (existing) {
      throw new ExistStoreRoomNumberException(`StoreRoom with number ${roomNumber} already exists`);
    }
  }
}
