import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import {
  VerifyTabletAdminPasswordDto,
  VerifyTabletAdminPasswordResponseDto,
} from '../dto/verify-tablet-admin-password.dto';

@Injectable()
export class VerifyTabletAdminPasswordUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator
  ) {}

  async execute(storeId: string, dto: VerifyTabletAdminPasswordDto): Promise<VerifyTabletAdminPasswordResponseDto> {
    await this.storeValidator.checkExist(storeId);

    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
      select: { tabletAdminPassword: true },
    });

    const valid = store?.tabletAdminPassword === dto.password;

    return { valid };
  }
}
