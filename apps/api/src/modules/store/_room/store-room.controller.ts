import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStoreRoomDto } from './dto/create-store-room.dto';
import { UpdateStoreRoomDto } from './dto/update-store-room.dto';
import { CreateStoreRoomUseCase } from './use-case/create-store-room.use-case';
import { FindStoreRoomsUseCase } from './use-case/find-store-rooms.use-case';
import { FindStoreRoomUseCase } from './use-case/find-store-room.use-case';
import { UpdateStoreRoomUseCase } from './use-case/update-store-room.use-case';
import { DeleteStoreRoomUseCase } from './use-case/delete-store-room.use-case';
import * as Swagger from './store-room.swagger';

@ApiTags('매장 방 관리')
@Controller('stores/:storeId/rooms')
export class StoreRoomController {
  constructor(
    private readonly createStoreRoomUseCase: CreateStoreRoomUseCase,
    private readonly findStoreRoomsUseCase: FindStoreRoomsUseCase,
    private readonly findStoreRoomUseCase: FindStoreRoomUseCase,
    private readonly updateStoreRoomUseCase: UpdateStoreRoomUseCase,
    private readonly deleteStoreRoomUseCase: DeleteStoreRoomUseCase
  ) {}

  @Swagger.createStoreRoom('방 생성')
  @Post()
  async create(@Param('storeId') storeId: string, @Body() dto: CreateStoreRoomDto) {
    return this.createStoreRoomUseCase.execute(storeId, dto);
  }

  @Swagger.findStoreRooms('방 목록 조회')
  @Get()
  async findRooms(@Param('storeId') storeId: string) {
    return this.findStoreRoomsUseCase.execute(storeId);
  }

  @Swagger.findStoreRoom('방 상세 조회')
  @Get(':roomId')
  async findRoom(@Param('storeId') storeId: string, @Param('roomId') roomId: string) {
    return this.findStoreRoomUseCase.execute(storeId, roomId);
  }

  @Swagger.updateStoreRoom('방 수정')
  @Put(':roomId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('storeId') storeId: string, @Param('roomId') roomId: string, @Body() dto: UpdateStoreRoomDto) {
    await this.updateStoreRoomUseCase.execute(storeId, roomId, dto);
  }

  @Swagger.deleteStoreRoom('방 삭제')
  @Delete(':roomId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('storeId') storeId: string, @Param('roomId') roomId: string) {
    await this.deleteStoreRoomUseCase.execute(storeId, roomId);
  }
}
