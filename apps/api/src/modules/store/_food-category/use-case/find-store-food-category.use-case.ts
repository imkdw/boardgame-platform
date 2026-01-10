import { Injectable } from '@nestjs/common';
import { StoreFoodCategoryValidator, StoreValidator } from '@repo/server-shared';
import { StoreFoodCategoryDto } from '../dto/store-food-category.dto';
import { toStoreFoodCategoryDto } from '../mapper/store-food-category.mapper';

@Injectable()
export class FindStoreFoodCategoryUseCase {
  constructor(
    private readonly storeValidator: StoreValidator,
    private readonly storeFoodCategoryValidator: StoreFoodCategoryValidator
  ) {}

  async execute(storeId: string, categoryId: string): Promise<StoreFoodCategoryDto> {
    await this.storeValidator.checkExist(storeId);
    const category = await this.storeFoodCategoryValidator.checkExist(storeId, categoryId);

    return toStoreFoodCategoryDto(category);
  }
}
