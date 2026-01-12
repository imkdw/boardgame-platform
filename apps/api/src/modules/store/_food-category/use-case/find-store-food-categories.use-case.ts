import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { StoreFoodCategoryDto } from '../dto/store-food-category.dto';
import { toStoreFoodCategoryDto } from '../mapper/store-food-category.mapper';

@Injectable()
export class FindStoreFoodCategoriesUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator
  ) {}

  async execute(storeId: string): Promise<StoreFoodCategoryDto[]> {
    await this.storeValidator.checkExist(storeId);

    const categories = await this.prisma.storeFoodCategory.findMany({
      where: { storeId, deletedAt: null },
      include: {
        items: {
          where: {
            food: {
              deletedAt: null,
            },
          },
        },
      },
    });

    return categories.map(category => toStoreFoodCategoryDto(category, category.items.length));
  }
}
