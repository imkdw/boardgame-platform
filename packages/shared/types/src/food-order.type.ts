import type { FoodOrderStatus } from '@repo/consts';

export interface FoodOrder {
  id: string;
  storeId: string;
  roomSessionId: string | null;
  roomNumber: number;
  status: FoodOrderStatus;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  items: FoodOrderItem[];
}

export interface FoodOrderItem {
  id: string;
  orderId: string;
  foodId: string;
  foodName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

/**
 * SSE 이벤트: 새로운 주문 생성됨
 */
export interface FoodOrderCreatedEvent {
  order: FoodOrder;
}

/**
 * SSE 이벤트: 주문 상태 변경됨
 */
export interface FoodOrderStatusChangedEvent {
  orderId: string;
  status: FoodOrderStatus;
  updatedAt: string;
}
