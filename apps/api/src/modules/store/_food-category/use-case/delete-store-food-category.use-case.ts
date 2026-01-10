import { Injectable } from '@nestjs/common';
import { PrismaService, StoreFoodCategoryValidator, StoreValidator } from '@repo/server-shared';

@Injectable()
export class DeleteStoreFoodCategoryUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeFoodCategoryValidator: StoreFoodCategoryValidator,
  ) {}

  async execute(storeId: string, categoryId: string): Promise<void> {
    await this.storeValidator.checkExist(storeId);
    await this.storeFoodCategoryValidator.checkExist(storeId, categoryId);

    await this.prisma.storeFoodCategory.update({
      where: { id: categoryId },
      data: { deletedAt: new Date() },
    });
  }
}
