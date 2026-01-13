export type RoomStatus = 'available' | 'occupied';

export interface Room {
  id: string;
  number: number;
  name: string;
  minCapacity: number;
  maxCapacity: number;
  status: RoomStatus;
  description?: string;
}

export interface TimePackage {
  id: string;
  durationMinutes: number;
  label: string;
  price: number;
  isRecommended?: boolean;
}

export interface TimePlan {
  id: string;
  storeId: string;
  name: string;
  durationMinutes: number;
  price: number;
  isRecommended: boolean;
  sort: number;
}

export function timePlanToTimePackage(plan: TimePlan): TimePackage {
  return {
    id: plan.id,
    durationMinutes: plan.durationMinutes,
    label: plan.name,
    price: plan.price,
    isRecommended: plan.isRecommended,
  };
}

export type PaymentMethodType = 'card' | 'cash' | 'kakaopay' | 'naverpay';

export interface PaymentMethod {
  id: PaymentMethodType;
  label: string;
  icon: string;
}

export interface KioskSession {
  storeId: string | null;
  peopleCount: number;
  selectedRoom: Room | null;
  selectedTimePackage: TimePackage | null;
  selectedPaymentMethod: PaymentMethodType | null;
  totalPrice: number;
  startTime: Date | null;
  endTime: Date | null;
}

export const initialKioskSession: KioskSession = {
  storeId: null,
  peopleCount: 0,
  selectedRoom: null,
  selectedTimePackage: null,
  selectedPaymentMethod: null,
  totalPrice: 0,
  startTime: null,
  endTime: null,
};
