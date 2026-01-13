import { Module, Global } from '@nestjs/common';
import { StoreSseController } from './store-sse.controller';
import { RoomStatusEventService } from './room-status-event.service';

@Global()
@Module({
  controllers: [StoreSseController],
  providers: [RoomStatusEventService],
  exports: [RoomStatusEventService],
})
export class StoreSseModule {}
