import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateStoreFoodDto } from './dto/create-store-food.dto';
import { StoreFoodDto } from './dto/store-food.dto';
import { UpdateStoreFoodDto } from './dto/update-store-food.dto';

export function createStoreFood(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateStoreFoodDto }),
    ApiCreatedResponse({ type: StoreFoodDto }),
  );
}

export function findStoreFoods(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: [StoreFoodDto] }));
}

export function findStoreFood(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: StoreFoodDto }));
}

export function updateStoreFood(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: UpdateStoreFoodDto }), ApiNoContentResponse());
}

export function deleteStoreFood(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiNoContentResponse());
}
