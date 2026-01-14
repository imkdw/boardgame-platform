import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import type { FoodOrderStatus } from '@repo/consts';
import type { FoodOrder } from '@repo/types';

export interface FoodOrderCreatedEvent {
  order: FoodOrder;
}

export interface FoodOrderStatusChangedEvent {
  orderId: string;
  status: FoodOrderStatus;
  updatedAt: string;
}

export type FoodOrderEvent = FoodOrderCreatedEvent | FoodOrderStatusChangedEvent;

@Injectable()
export class FoodOrderEventService {
  private readonly createdEmitters = new Map<string, Subject<FoodOrderCreatedEvent>>();
  private readonly statusChangedEmitters = new Map<string, Subject<FoodOrderStatusChangedEvent>>();

  private getOrCreateCreatedEmitter(storeId: string): Subject<FoodOrderCreatedEvent> {
    let emitter = this.createdEmitters.get(storeId);
    if (!emitter) {
      emitter = new Subject<FoodOrderCreatedEvent>();
      this.createdEmitters.set(storeId, emitter);
    }
    return emitter;
  }

  private getOrCreateStatusChangedEmitter(storeId: string): Subject<FoodOrderStatusChangedEvent> {
    let emitter = this.statusChangedEmitters.get(storeId);
    if (!emitter) {
      emitter = new Subject<FoodOrderStatusChangedEvent>();
      this.statusChangedEmitters.set(storeId, emitter);
    }
    return emitter;
  }

  getCreatedEmitter(storeId: string): Observable<FoodOrderCreatedEvent> {
    return this.getOrCreateCreatedEmitter(storeId).asObservable();
  }

  getStatusChangedEmitter(storeId: string): Observable<FoodOrderStatusChangedEvent> {
    return this.getOrCreateStatusChangedEmitter(storeId).asObservable();
  }

  emitCreated(storeId: string, event: FoodOrderCreatedEvent): void {
    const emitter = this.getOrCreateCreatedEmitter(storeId);
    emitter.next(event);
  }

  emitStatusChanged(storeId: string, event: FoodOrderStatusChangedEvent): void {
    const emitter = this.getOrCreateStatusChangedEmitter(storeId);
    emitter.next(event);
  }
}
