import { Global, Module } from '@nestjs/common';
import { StoreValidator } from './store.validator';
import { StoreFoodValidator } from './store-food.validator';
import { StoreFoodCategoryValidator } from './store-food-category.validator';
import { StoreGameValidator } from './store-game.validator';
import { StoreRoomValidator } from './store-room.validator';
import { StoreDeviceValidator } from './store-device.validator';

const validators = [
  StoreValidator,
  StoreFoodValidator,
  StoreFoodCategoryValidator,
  StoreGameValidator,
  StoreRoomValidator,
  StoreDeviceValidator,
];

@Global()
@Module({
  providers: validators,
  exports: validators,
})
export class ValidatorModule {}
