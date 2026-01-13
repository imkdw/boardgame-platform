import { Module } from '@nestjs/common';
import { StoreTimePlanController } from './store-time-plan.controller';
import { CreateStoreTimePlanUseCase } from './use-case/create-store-time-plan.use-case';
import { DeleteStoreTimePlanUseCase } from './use-case/delete-store-time-plan.use-case';
import { FindStoreTimePlansUseCase } from './use-case/find-store-time-plans.use-case';
import { UpdateStoreTimePlanUseCase } from './use-case/update-store-time-plan.use-case';

@Module({
  controllers: [StoreTimePlanController],
  providers: [
    CreateStoreTimePlanUseCase,
    DeleteStoreTimePlanUseCase,
    FindStoreTimePlansUseCase,
    UpdateStoreTimePlanUseCase,
  ],
})
export class StoreTimePlanModule {}
