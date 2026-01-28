import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { SetTabletAdminPasswordDto } from '../dto/set-tablet-admin-password.dto';

@Injectable()
export class SetTabletAdminPasswordUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator
  ) {}

  async execute(storeId: string, dto: SetTabletAdminPasswordDto): Promise<void> {
    await this.storeValidator.checkExist(storeId);

    await this.prisma.store.update({
      where: { id: storeId },
      data: { tabletAdminPassword: dto.password },
    });
  }
}
