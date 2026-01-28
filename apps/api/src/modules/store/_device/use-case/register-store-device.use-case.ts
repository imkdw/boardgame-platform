import { Injectable } from '@nestjs/common';
import { StoreDevice } from '@prisma/client';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { RegisterStoreDeviceDto } from '../dto/register-store-device.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class RegisterStoreDeviceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator
  ) {}

  async execute(storeId: string, dto: RegisterStoreDeviceDto): Promise<StoreDevice> {
    await this.storeValidator.checkExist(storeId);

    const existing = await this.prisma.storeDevice.findFirst({
      where: { deviceId: dto.deviceId, deletedAt: null },
    });

    if (existing) {
      return this.prisma.storeDevice.update({
        where: { id: existing.id },
        data: {
          storeId,
          roomId: dto.roomId ?? null,
          name: dto.name ?? null,
        },
      });
    }

    return this.prisma.storeDevice.create({
      data: {
        id: randomUUID(),
        storeId,
        deviceId: dto.deviceId,
        roomId: dto.roomId ?? null,
        name: dto.name ?? null,
      },
    });
  }
}
