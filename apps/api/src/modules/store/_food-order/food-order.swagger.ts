import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateFoodOrderDto } from './dto/create-food-order.dto';
import { FoodOrderDto } from './dto/food-order.dto';
import { UpdateFoodOrderStatusDto } from './dto/update-food-order-status.dto';

export function createFoodOrder(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateFoodOrderDto }),
    ApiCreatedResponse({ type: FoodOrderDto }),
  );
}

export function findFoodOrders(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: [FoodOrderDto] }));
}

export function updateFoodOrderStatus(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: UpdateFoodOrderStatusDto }),
    ApiNoContentResponse(),
  );
}
