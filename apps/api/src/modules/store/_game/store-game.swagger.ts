import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateStoreGameDto } from './dto/create-store-game.dto';
import { StoreGameDto } from './dto/store-game.dto';
import { UpdateStoreGameDto } from './dto/update-store-game.dto';

export function createStoreGame(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateStoreGameDto }),
    ApiCreatedResponse({ type: StoreGameDto })
  );
}

export function findStoreGames(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: [StoreGameDto] }));
}

export function findStoreGame(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: StoreGameDto }));
}

export function updateStoreGame(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: UpdateStoreGameDto }), ApiNoContentResponse());
}

export function deleteStoreGame(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiNoContentResponse());
}
