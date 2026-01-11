import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { CreateStoreUseCase } from '@/modules/store/use-case/create-store.use-case';
import { DeleteStoreUseCase } from '@/modules/store/use-case/delete-store.use-case';
import { FindStoreByIpUseCase } from '@/modules/store/use-case/find-store-by-ip.use-case';
import { FindStoreUseCase } from '@/modules/store/use-case/find-store.use-case';
import { FindStoresUseCase } from '@/modules/store/use-case/find-stores.use-case';
import { UpdateStoreUseCase } from '@/modules/store/use-case/update-store.use-case';
import { StoreFoodModule } from './_food/store-food.module';
import { StoreFoodCategoryModule } from './_food-category/store-food-category.module';
import { StoreGameModule } from './_game/store-game.module';
import { StoreRoomModule } from './_room/store-room.module';

@Module({
  imports: [StoreFoodModule, StoreFoodCategoryModule, StoreGameModule, StoreRoomModule],
  controllers: [StoreController],
  providers: [
    CreateStoreUseCase,
    DeleteStoreUseCase,
    FindStoreByIpUseCase,
    FindStoreUseCase,
    FindStoresUseCase,
    UpdateStoreUseCase,
  ],
})
export class StoreModule {}
