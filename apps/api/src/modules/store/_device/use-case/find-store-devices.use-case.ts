import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { StoreDeviceDto } from '../dto/store-device.dto';
import { toStoreDeviceDto } from '../mapper/store-device.mapper';

@Injectable()
export class FindStoreDevicesUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator
  ) {}

  async execute(storeId: string): Promise<StoreDeviceDto[]> {
    await this.storeValidator.checkExist(storeId);

    const devices = await this.prisma.storeDevice.findMany({
      where: { storeId, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });

    return devices.map(toStoreDeviceDto);
  }
}
