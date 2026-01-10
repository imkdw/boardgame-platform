import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateStoreRoomDto } from './dto/create-store-room.dto';
import { StoreRoomDto } from './dto/store-room.dto';
import { UpdateStoreRoomDto } from './dto/update-store-room.dto';

export function createStoreRoom(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateStoreRoomDto }),
    ApiCreatedResponse({ type: StoreRoomDto })
  );
}

export function findStoreRooms(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: [StoreRoomDto] }));
}

export function findStoreRoom(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: StoreRoomDto }));
}

export function updateStoreRoom(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: UpdateStoreRoomDto }), ApiNoContentResponse());
}

export function deleteStoreRoom(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiNoContentResponse());
}
