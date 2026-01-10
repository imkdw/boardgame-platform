import { Injectable } from '@nestjs/common';
import { PrismaService, StoreFoodCategoryValidator, StoreValidator } from '@repo/server-shared';
import { UpdateStoreFoodCategoryDto } from '../dto/update-store-food-category.dto';

@Injectable()
export class UpdateStoreFoodCategoryUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeFoodCategoryValidator: StoreFoodCategoryValidator,
  ) {}

  async execute(storeId: string, categoryId: string, dto: UpdateStoreFoodCategoryDto): Promise<void> {
    await this.storeValidator.checkExist(storeId);
    const category = await this.storeFoodCategoryValidator.checkExist(storeId, categoryId);

    if (dto.name !== category.name) {
      await this.storeFoodCategoryValidator.checkExistName(storeId, dto.name);
    }

    await this.prisma.storeFoodCategory.update({
      where: { id: categoryId },
      data: dto,
    });
  }
}
