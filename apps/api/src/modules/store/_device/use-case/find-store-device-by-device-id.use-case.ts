import { Injectable } from '@nestjs/common';
import { PrismaService, StoreDeviceNotFoundException, StoreValidator } from '@repo/server-shared';
import { StoreDeviceDto } from '../dto/store-device.dto';
import { toStoreDeviceDto } from '../mapper/store-device.mapper';

@Injectable()
export class FindStoreDeviceByDeviceIdUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator
  ) {}

  async execute(storeId: string, deviceId: string): Promise<StoreDeviceDto> {
    await this.storeValidator.checkExist(storeId);

    const device = await this.prisma.storeDevice.findFirst({
      where: { storeId, deviceId, deletedAt: null },
    });

    if (!device) {
      throw new StoreDeviceNotFoundException(`StoreDevice with deviceId ${deviceId} not found`);
    }

    return toStoreDeviceDto(device);
  }
}
