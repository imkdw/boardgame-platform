import { Injectable } from '@nestjs/common';
import { StoreRoom } from '@prisma/client';
import { PrismaService, StoreRoomValidator, StoreValidator } from '@repo/server-shared';
import { CreateStoreRoomDto } from '../dto/create-store-room.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateStoreRoomUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeRoomValidator: StoreRoomValidator
  ) {}

  async execute(storeId: string, dto: CreateStoreRoomDto): Promise<StoreRoom> {
    await this.storeValidator.checkExist(storeId);
    await this.storeRoomValidator.checkExistRoomNumber(storeId, dto.roomNumber);

    return this.prisma.storeRoom.create({
      data: {
        id: randomUUID(),
        storeId,
        roomNumber: dto.roomNumber,
        status: dto.status,
        minCapacity: dto.minCapacity,
        maxCapacity: dto.maxCapacity,
        description: dto.description,
      },
    });
  }
}
