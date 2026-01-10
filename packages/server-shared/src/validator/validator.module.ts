import { Global, Module } from '@nestjs/common';
import { StoreValidator } from './store.validator';

@Global()
@Module({
  providers: [StoreValidator],
  exports: [StoreValidator],
})
export class ValidatorModule {}
