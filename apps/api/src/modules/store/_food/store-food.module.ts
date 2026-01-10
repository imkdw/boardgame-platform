import { Module } from '@nestjs/common';
import { StoreFoodController } from './store-food.controller';
import { CreateStoreFoodUseCase } from './use-case/create-store-food.use-case';
import { DeleteStoreFoodUseCase } from './use-case/delete-store-food.use-case';
import { FindStoreFoodUseCase } from './use-case/find-store-food.use-case';
import { FindStoreFoodsUseCase } from './use-case/find-store-foods.use-case';
import { UpdateStoreFoodUseCase } from './use-case/update-store-food.use-case';

@Module({
  controllers: [StoreFoodController],
  providers: [
    CreateStoreFoodUseCase,
    DeleteStoreFoodUseCase,
    FindStoreFoodUseCase,
    FindStoreFoodsUseCase,
    UpdateStoreFoodUseCase,
  ],
})
export class StoreFoodModule {}
