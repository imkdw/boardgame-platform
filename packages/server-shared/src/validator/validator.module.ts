import { Global, Module } from '@nestjs/common';
import { StoreValidator } from './store.validator';
import { StoreFoodValidator } from './store-food.validator';

@Global()
@Module({
  providers: [StoreValidator, StoreFoodValidator],
  exports: [StoreValidator, StoreFoodValidator],
})
export class ValidatorModule {}
