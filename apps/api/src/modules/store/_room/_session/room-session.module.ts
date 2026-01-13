import { Module } from '@nestjs/common';
import { RoomSessionController } from './room-session.controller';
import { CreateRoomSessionUseCase } from './use-case/create-room-session.use-case';
import { EndRoomSessionUseCase } from './use-case/end-room-session.use-case';
import { FindActiveRoomSessionUseCase } from './use-case/find-active-room-session.use-case';

@Module({
  controllers: [RoomSessionController],
  providers: [CreateRoomSessionUseCase, EndRoomSessionUseCase, FindActiveRoomSessionUseCase],
})
export class RoomSessionModule {}
