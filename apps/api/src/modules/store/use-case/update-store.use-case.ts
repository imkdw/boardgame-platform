import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { UpdateStoreDto } from '../dto/update-store.dto';

@Injectable()
export class UpdateStoreUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator
  ) {}

  async execute(storeId: string, dto: UpdateStoreDto): Promise<void> {
    const store = await this.storeValidator.checkExist(storeId);

    const validations: Promise<void>[] = [];

    if (dto.name !== store.name) {
      validations.push(this.storeValidator.checkExistName(dto.name));
    }

    if (dto.ip !== store.ip) {
      validations.push(this.storeValidator.checkExistIp(dto.ip));
    }

    await Promise.all(validations);

    await this.prisma.store.update({
      where: { id: storeId },
      data: dto,
    });
  }
}
