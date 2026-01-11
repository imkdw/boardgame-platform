import type { FoodItem } from '@repo/types';
import type { StoreRoomStatus } from '@repo/consts';

export type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export type MenuItem = FoodItem;

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
  roomId?: string;
  roomNumber?: number;
  createdAt: Date;
  updatedAt: Date;
  paymentMethod?: 'cash' | 'card' | 'pg';
}

export interface POSSession {
  currentOrder: Order | null;
  selectedRoom: string | null;
}

export const initialPOSSession: POSSession = {
  currentOrder: null,
  selectedRoom: null,
};

export type RoomStatus = StoreRoomStatus;
export type GameStatus = 'AVAILABLE' | 'RENTED' | 'REPAIR';

export interface RentedGame {
  id: string;
  gameId: string;
  gameName: string;
  rentedAt: Date;
}

export interface ActiveRoom {
  id: string;
  roomNumber: number;
  status: RoomStatus;
  checkInTime: Date | null;
  endTime: Date | null;
  rentedGames: RentedGame[];
  pendingOrderCount: number;
  reservedTime?: Date;
}

export interface CartItem {
  menuItemId: string;
  menuItem: MenuItem;
  quantity: number;
}

export interface SalesSummary {
  timePackageSales: number;
  menuSales: number;
  totalSales: number;
}

export interface Game {
  id: string;
  name: string;
  category: string;
  minPlayers: number;
  maxPlayers: number;
  playTime: number;
  difficulty: 1 | 2 | 3;
  status: GameStatus;
  rentedToRoomId?: string;
  rentedToRoomNumber?: number;
  rentedAt?: Date;
}

// 게임 재고 관리를 위한 타입
export interface GameInventory {
  id: string;
  name: string;
  category: string;
  minPlayers: number;
  maxPlayers: number;
  playTime: number;
  difficulty: 1 | 2 | 3;
  totalCount: number; // 총 보유 개수
  repairCount: number; // 수리 중인 개수
}

// 개별 게임 인스턴스 (대여 추적용)
export interface GameInstance {
  id: string;
  gameId: string; // GameInventory.id 참조
  status: GameStatus;
  rentedToRoomId?: string;
  rentedToRoomNumber?: number;
  rentedAt?: Date;
}

// 재고 정보가 포함된 게임 뷰
export interface GameWithStock {
  id: string;
  name: string;
  category: string;
  minPlayers: number;
  maxPlayers: number;
  playTime: number;
  difficulty: 1 | 2 | 3;
  totalCount: number;
  availableCount: number;
  rentedCount: number;
  repairCount: number;
  rentedInstances: GameInstance[]; // 대여 중인 인스턴스들
}

export interface MenuCategory {
  id: string;
  name: string;
}
