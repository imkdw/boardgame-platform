export interface CreateStoreTimePlanDto {
  name: string;
  durationMinutes: number;
  price: number;
  isRecommended?: boolean;
}

export interface UpdateStoreTimePlanDto {
  name: string;
  durationMinutes: number;
  price: number;
  isRecommended: boolean;
  sort: number;
}
