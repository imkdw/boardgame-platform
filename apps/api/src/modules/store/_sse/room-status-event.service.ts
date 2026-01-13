import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { StoreRoomStatus } from '@repo/consts';

export interface RoomStatusEvent {
  roomId: string;
  status: StoreRoomStatus;
  sessionId: string | null;
}

@Injectable()
export class RoomStatusEventService {
  private readonly emitters = new Map<string, Subject<RoomStatusEvent>>();

  getEmitter(storeId: string): Observable<RoomStatusEvent> {
    if (!this.emitters.has(storeId)) {
      this.emitters.set(storeId, new Subject<RoomStatusEvent>());
    }
    const emitter = this.emitters.get(storeId);
    if (!emitter) {
      throw new Error('Emitter not found');
    }
    return emitter.asObservable();
  }

  emit(storeId: string, event: RoomStatusEvent): void {
    const emitter = this.emitters.get(storeId);
    if (emitter) {
      emitter.next(event);
    }
  }

  removeEmitter(storeId: string): void {
    const emitter = this.emitters.get(storeId);
    if (emitter) {
      emitter.complete();
      this.emitters.delete(storeId);
    }
  }
}
