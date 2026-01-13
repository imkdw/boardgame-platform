import { Controller, Param, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable, map, interval, merge } from 'rxjs';
import { SSE_EVENT_TYPES } from '@repo/consts';
import { RoomStatusEventService } from './room-status-event.service';

interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@ApiTags('매장 SSE')
@Controller('stores/:storeId/sse')
export class StoreSseController {
  constructor(private readonly roomStatusEventService: RoomStatusEventService) {}

  @Sse('room-status')
  roomStatusEvents(@Param('storeId') storeId: string): Observable<MessageEvent> {
    const roomEvents = this.roomStatusEventService.getEmitter(storeId).pipe(
      map((event) => ({
        data: event,
        type: SSE_EVENT_TYPES.ROOM_STATUS_CHANGED,
      })),
    );

    // 30초마다 heartbeat 전송 (연결 유지)
    const heartbeat = interval(30000).pipe(
      map(() => ({
        data: { type: SSE_EVENT_TYPES.HEARTBEAT, timestamp: new Date().toISOString() },
        type: SSE_EVENT_TYPES.HEARTBEAT,
      })),
    );

    return merge(roomEvents, heartbeat);
  }
}
