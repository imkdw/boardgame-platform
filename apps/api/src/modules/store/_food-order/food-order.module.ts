import { Module } from '@nestjs/common';
import { FoodOrderController } from './food-order.controller';
import { CreateFoodOrderUseCase } from './use-case/create-food-order.use-case';
import { FindFoodOrdersUseCase } from './use-case/find-food-orders.use-case';
import { UpdateFoodOrderStatusUseCase } from './use-case/update-food-order-status.use-case';

@Module({
  controllers: [FoodOrderController],
  providers: [CreateFoodOrderUseCase, FindFoodOrdersUseCase, UpdateFoodOrderStatusUseCase],
})
export class FoodOrderModule {}
