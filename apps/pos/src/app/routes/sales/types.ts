// 매출 관련 타입 정의

export type PaymentMethod = 'cash' | 'card' | 'pg';

export type SalesCategory = 'time_package' | 'food' | 'drink' | 'snack' | 'etc';

export interface SalesRecord {
  id: string;
  orderNumber: string;
  roomNumber: number | null;
  category: SalesCategory;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  createdAt: Date;
}

export interface DailySales {
  date: string;
  timePackage: number;
  food: number;
  drink: number;
  snack: number;
  etc: number;
  total: number;
}

export interface HourlySales {
  hour: string;
  sales: number;
}

export interface CategorySales {
  category: SalesCategory;
  categoryName: string;
  sales: number;
  percentage: number;
}

export interface SalesStats {
  todayTotal: number;
  todayDiff: number;
  weekTotal: number;
  weekDiff: number;
  monthTotal: number;
  monthDiff: number;
  avgOrderPrice: number;
  avgOrderDiff: number;
}

export const CATEGORY_LABELS: Record<SalesCategory, string> = {
  time_package: '시간권',
  food: '음식',
  drink: '음료',
  snack: '스낵',
  etc: '기타',
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: '현금',
  card: '카드',
  pg: 'PG결제',
};
