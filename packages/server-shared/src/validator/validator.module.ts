import { Global, Module } from '@nestjs/common';
import { StoreValidator } from './store.validator';
import { StoreFoodValidator } from './store-food.validator';
import { StoreFoodCategoryValidator } from './store-food-category.validator';

@Global()
@Module({
  providers: [StoreValidator, StoreFoodValidator, StoreFoodCategoryValidator],
  exports: [StoreValidator, StoreFoodValidator, StoreFoodCategoryValidator],
})
export class ValidatorModule {}
