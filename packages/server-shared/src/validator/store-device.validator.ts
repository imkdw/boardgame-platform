import { Injectable } from '@nestjs/common';
import { StoreDevice } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { StoreDeviceNotFoundException } from '../exception';

@Injectable()
export class StoreDeviceValidator {
  constructor(private readonly prisma: PrismaService) {}

  async checkExist(id: string): Promise<StoreDevice> {
    const device = await this.prisma.storeDevice.findFirst({
      where: { id, deletedAt: null },
    });

    if (!device) {
      throw new StoreDeviceNotFoundException(`StoreDevice with id ${id} not found`);
    }

    return device;
  }

  async checkExistByDeviceId(deviceId: string): Promise<boolean> {
    const existing = await this.prisma.storeDevice.findFirst({
      where: { deviceId, deletedAt: null },
    });

    return !!existing;
  }
}
