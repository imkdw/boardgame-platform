import { Injectable } from '@nestjs/common';
import { PrismaService, StoreDeviceValidator, StoreValidator } from '@repo/server-shared';
import { UpdateStoreDeviceDto } from '../dto/update-store-device.dto';

@Injectable()
export class UpdateStoreDeviceUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeDeviceValidator: StoreDeviceValidator
  ) {}

  async execute(storeId: string, id: string, dto: UpdateStoreDeviceDto): Promise<void> {
    await this.storeValidator.checkExist(storeId);
    await this.storeDeviceValidator.checkExist(id);

    await this.prisma.storeDevice.update({
      where: { id },
      data: dto,
    });
  }
}
