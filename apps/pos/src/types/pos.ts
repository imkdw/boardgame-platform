// POS 앱 타입 정의

export type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  totalPrice: number;
  tableNumber?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface POSSession {
  currentOrder: Order | null;
  selectedTable: number | null;
}

export const initialPOSSession: POSSession = {
  currentOrder: null,
  selectedTable: null,
};
