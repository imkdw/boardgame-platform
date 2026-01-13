import { Module } from '@nestjs/common';
import { StoreRoomController } from './store-room.controller';
import { CreateStoreRoomUseCase } from './use-case/create-store-room.use-case';
import { FindStoreRoomsUseCase } from './use-case/find-store-rooms.use-case';
import { FindStoreRoomUseCase } from './use-case/find-store-room.use-case';
import { UpdateStoreRoomUseCase } from './use-case/update-store-room.use-case';
import { DeleteStoreRoomUseCase } from './use-case/delete-store-room.use-case';
import { RoomSessionModule } from './_session/room-session.module';

@Module({
  imports: [RoomSessionModule],
  controllers: [StoreRoomController],
  providers: [
    CreateStoreRoomUseCase,
    FindStoreRoomsUseCase,
    FindStoreRoomUseCase,
    UpdateStoreRoomUseCase,
    DeleteStoreRoomUseCase,
  ],
})
export class StoreRoomModule {}
