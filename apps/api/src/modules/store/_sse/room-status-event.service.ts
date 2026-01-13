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

  private getOrCreateEmitter(storeId: string): Subject<RoomStatusEvent> {
    let emitter = this.emitters.get(storeId);
    if (!emitter) {
      emitter = new Subject<RoomStatusEvent>();
      this.emitters.set(storeId, emitter);
    }
    return emitter;
  }

  getEmitter(storeId: string): Observable<RoomStatusEvent> {
    return this.getOrCreateEmitter(storeId).asObservable();
  }

  emit(storeId: string, event: RoomStatusEvent): void {
    // getOrCreateEmitter를 사용하여 emitter가 없으면 생성
    // 이를 통해 클라이언트가 아직 연결하지 않아도 이벤트 발행 준비가 됨
    const emitter = this.getOrCreateEmitter(storeId);
    emitter.next(event);
  }

  removeEmitter(storeId: string): void {
    const emitter = this.emitters.get(storeId);
    if (emitter) {
      emitter.complete();
      this.emitters.delete(storeId);
    }
  }
}
