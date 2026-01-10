import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStoreGameDto } from './dto/create-store-game.dto';
import { UpdateStoreGameDto } from './dto/update-store-game.dto';
import { CreateStoreGameUseCase } from './use-case/create-store-game.use-case';
import { DeleteStoreGameUseCase } from './use-case/delete-store-game.use-case';
import { FindStoreGameUseCase } from './use-case/find-store-game.use-case';
import { FindStoreGamesUseCase } from './use-case/find-store-games.use-case';
import { UpdateStoreGameUseCase } from './use-case/update-store-game.use-case';
import * as Swagger from './store-game.swagger';

@ApiTags('매장 보드게임 관리')
@Controller('stores/:storeId/games')
export class StoreGameController {
  constructor(
    private readonly createStoreGameUseCase: CreateStoreGameUseCase,
    private readonly deleteStoreGameUseCase: DeleteStoreGameUseCase,
    private readonly findStoreGameUseCase: FindStoreGameUseCase,
    private readonly findStoreGamesUseCase: FindStoreGamesUseCase,
    private readonly updateStoreGameUseCase: UpdateStoreGameUseCase
  ) {}

  @Swagger.createStoreGame('보드게임 생성')
  @Post()
  async create(@Param('storeId') storeId: string, @Body() dto: CreateStoreGameDto) {
    return this.createStoreGameUseCase.execute(storeId, dto);
  }

  @Swagger.findStoreGames('보드게임 목록 조회')
  @Get()
  async findStoreGames(@Param('storeId') storeId: string) {
    return this.findStoreGamesUseCase.execute(storeId);
  }

  @Swagger.findStoreGame('보드게임 상세 조회')
  @Get(':gameId')
  async findStoreGame(@Param('storeId') storeId: string, @Param('gameId') gameId: string) {
    return this.findStoreGameUseCase.execute(storeId, gameId);
  }

  @Swagger.updateStoreGame('보드게임 수정')
  @Put(':gameId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('storeId') storeId: string, @Param('gameId') gameId: string, @Body() dto: UpdateStoreGameDto) {
    await this.updateStoreGameUseCase.execute(storeId, gameId, dto);
  }

  @Swagger.deleteStoreGame('보드게임 삭제')
  @Delete(':gameId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('storeId') storeId: string, @Param('gameId') gameId: string) {
    await this.deleteStoreGameUseCase.execute(storeId, gameId);
  }
}
