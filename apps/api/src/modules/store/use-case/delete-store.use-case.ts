import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';

@Injectable()
export class DeleteStoreUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
  ) {}

  async execute(storeId: string): Promise<void> {
    await this.storeValidator.checkExist(storeId);

    await this.prisma.store.update({
      where: { id: storeId },
      data: { deletedAt: new Date() },
    });
  }
}
