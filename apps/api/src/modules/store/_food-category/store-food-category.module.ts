import { Module } from '@nestjs/common';
import { StoreFoodCategoryController } from './store-food-category.controller';
import { CreateStoreFoodCategoryUseCase } from './use-case/create-store-food-category.use-case';
import { FindStoreFoodCategoriesUseCase } from './use-case/find-store-food-categories.use-case';
import { FindStoreFoodCategoryUseCase } from './use-case/find-store-food-category.use-case';
import { FindStoreFoodCategoryItemsUseCase } from './use-case/find-store-food-category-items.use-case';
import { UpdateStoreFoodCategoryUseCase } from './use-case/update-store-food-category.use-case';
import { DeleteStoreFoodCategoryUseCase } from './use-case/delete-store-food-category.use-case';

@Module({
  controllers: [StoreFoodCategoryController],
  providers: [
    CreateStoreFoodCategoryUseCase,
    FindStoreFoodCategoriesUseCase,
    FindStoreFoodCategoryUseCase,
    FindStoreFoodCategoryItemsUseCase,
    UpdateStoreFoodCategoryUseCase,
    DeleteStoreFoodCategoryUseCase,
  ],
})
export class StoreFoodCategoryModule {}
