import { Global, Module } from '@nestjs/common';
import { StoreValidator } from './store.validator';
import { StoreFoodValidator } from './store-food.validator';
import { StoreFoodCategoryValidator } from './store-food-category.validator';
import { StoreRoomValidator } from './store-room.validator';

@Global()
@Module({
  providers: [StoreValidator, StoreFoodValidator, StoreFoodCategoryValidator, StoreRoomValidator],
  exports: [StoreValidator, StoreFoodValidator, StoreFoodCategoryValidator, StoreRoomValidator],
})
export class ValidatorModule {}
