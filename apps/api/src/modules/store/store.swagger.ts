import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreDto } from './dto/store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

export function createStore(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateStoreDto }),
    ApiCreatedResponse({ type: StoreDto })
  );
}

export function findStores(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: [StoreDto] }));
}

export function findStore(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: StoreDto }));
}

export function updateStore(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: UpdateStoreDto }), ApiNoContentResponse());
}

export function deleteStore(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiNoContentResponse());
}
