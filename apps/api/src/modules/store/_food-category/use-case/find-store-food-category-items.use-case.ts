import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { StoreFoodCategoryItemDto } from '../dto/store-food-category-item.dto';
import { toStoreFoodCategoryItemDto } from '../mapper/store-food-category.mapper';

@Injectable()
export class FindStoreFoodCategoryItemsUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator
  ) {}

  async execute(storeId: string, categoryId: string): Promise<StoreFoodCategoryItemDto[]> {
    await this.storeValidator.checkExist(storeId);

    const items = await this.prisma.storeFoodCategoryItem.findMany({
      where: { categoryId },
      orderBy: { order: 'asc' },
      include: { food: true },
    });

    return items.map(toStoreFoodCategoryItemDto);
  }
}
