import { Injectable } from '@nestjs/common';
import { PrismaService, StoreFoodValidator, StoreValidator } from '@repo/server-shared';

@Injectable()
export class DeleteStoreFoodUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeFoodValidator: StoreFoodValidator,
  ) {}

  async execute(storeId: string, foodId: string): Promise<void> {
    await this.storeValidator.checkExist(storeId);
    await this.storeFoodValidator.checkExist(storeId, foodId);

    await this.prisma.storeFood.update({
      where: { id: foodId },
      data: { deletedAt: new Date() },
    });
  }
}
