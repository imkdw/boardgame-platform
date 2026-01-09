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
  priceWeekday: number;
  priceWeekend: number;
  isRecommended?: boolean;
  isUnlimited?: boolean;
}

export type PaymentMethodType = 'card' | 'cash' | 'kakaopay' | 'naverpay';

export interface PaymentMethod {
  id: PaymentMethodType;
  label: string;
  icon: string;
}

export interface KioskSession {
  peopleCount: number;
  selectedRoom: Room | null;
  selectedTimePackage: TimePackage | null;
  selectedPaymentMethod: PaymentMethodType | null;
  totalPrice: number;
  startTime: Date | null;
  endTime: Date | null;
}

export const initialKioskSession: KioskSession = {
  peopleCount: 0,
  selectedRoom: null,
  selectedTimePackage: null,
  selectedPaymentMethod: null,
  totalPrice: 0,
  startTime: null,
  endTime: null,
};
