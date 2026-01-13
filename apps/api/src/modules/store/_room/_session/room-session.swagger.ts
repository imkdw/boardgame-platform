import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateRoomSessionDto } from './dto/create-room-session.dto';
import { RoomSessionDto } from './dto/room-session.dto';

export function createRoomSession(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateRoomSessionDto }),
    ApiCreatedResponse({ type: RoomSessionDto }),
  );
}

export function endRoomSession(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: RoomSessionDto }));
}

export function findActiveRoomSession(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: RoomSessionDto }));
}
