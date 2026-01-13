export interface StoreTimePlan {
  id: string;
  storeId: string;
  name: string;
  durationMinutes: number;
  price: number;
  isRecommended: boolean;
  sort: number;
  createdAt: Date;
}
