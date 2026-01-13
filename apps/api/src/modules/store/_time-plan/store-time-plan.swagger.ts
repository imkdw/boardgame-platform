import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateStoreTimePlanDto } from './dto/create-store-time-plan.dto';
import { StoreTimePlanDto } from './dto/store-time-plan.dto';
import { UpdateStoreTimePlanDto } from './dto/update-store-time-plan.dto';

export function createStoreTimePlan(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateStoreTimePlanDto }),
    ApiCreatedResponse({ type: StoreTimePlanDto }),
  );
}

export function findStoreTimePlans(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: [StoreTimePlanDto] }));
}

export function updateStoreTimePlan(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: UpdateStoreTimePlanDto }), ApiNoContentResponse());
}

export function deleteStoreTimePlan(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiNoContentResponse());
}
