import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoomSessionDto } from './dto/create-room-session.dto';
import { CreateRoomSessionUseCase } from './use-case/create-room-session.use-case';
import { EndRoomSessionUseCase } from './use-case/end-room-session.use-case';
import { FindActiveRoomSessionUseCase } from './use-case/find-active-room-session.use-case';
import * as Swagger from './room-session.swagger';

@ApiTags('방 예약 세션 관리')
@Controller('stores/:storeId')
export class RoomSessionController {
  constructor(
    private readonly createRoomSessionUseCase: CreateRoomSessionUseCase,
    private readonly endRoomSessionUseCase: EndRoomSessionUseCase,
    private readonly findActiveRoomSessionUseCase: FindActiveRoomSessionUseCase,
  ) {}

  @Swagger.createRoomSession('방 세션 생성 (예약 시작)')
  @Post('rooms/:roomId/sessions')
  async create(
    @Param('storeId') storeId: string,
    @Param('roomId') roomId: string,
    @Body() dto: CreateRoomSessionDto,
  ) {
    return this.createRoomSessionUseCase.execute(storeId, roomId, dto);
  }

  @Swagger.endRoomSession('방 세션 종료')
  @Post('rooms/:roomId/sessions/:sessionId/end')
  async end(
    @Param('storeId') storeId: string,
    @Param('roomId') roomId: string,
    @Param('sessionId') sessionId: string,
  ) {
    return this.endRoomSessionUseCase.execute(storeId, roomId, sessionId);
  }

  @Swagger.findActiveRoomSession('활성 세션 조회')
  @Get('rooms/:roomId/sessions/active')
  async findActive(@Param('storeId') storeId: string, @Param('roomId') roomId: string) {
    return this.findActiveRoomSessionUseCase.execute(storeId, roomId);
  }
}
