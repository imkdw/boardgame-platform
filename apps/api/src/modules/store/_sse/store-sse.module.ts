import { Module, Global } from '@nestjs/common';
import { StoreSseController } from './store-sse.controller';
import { RoomStatusEventService } from './room-status-event.service';
import { FoodOrderEventService } from './food-order-event.service';

@Global()
@Module({
  controllers: [StoreSseController],
  providers: [RoomStatusEventService, FoodOrderEventService],
  exports: [RoomStatusEventService, FoodOrderEventService],
})
export class StoreSseModule {}
