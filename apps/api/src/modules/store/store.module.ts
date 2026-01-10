import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { CreateStoreUseCase } from '@/modules/store/use-case/create-store.use-case';
import { DeleteStoreUseCase } from '@/modules/store/use-case/delete-store.use-case';
import { FindStoreUseCase } from '@/modules/store/use-case/find-store.use-case';
import { FindStoresUseCase } from '@/modules/store/use-case/find-stores.use-case';
import { UpdateStoreUseCase } from '@/modules/store/use-case/update-store.use-case';
import { StoreFoodModule } from './_food/store-food.module';

@Module({
  imports: [StoreFoodModule],
  controllers: [StoreController],
  providers: [CreateStoreUseCase, DeleteStoreUseCase, FindStoreUseCase, FindStoresUseCase, UpdateStoreUseCase],
})
export class StoreModule {}
