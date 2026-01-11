export interface FoodCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  order: number;
}

export interface FoodItem {
  id: string;
  categoryId: string;
  name: string;
  nameEn?: string;
  description?: string;
  descriptionEn?: string;
  price: number;
  thumbnail?: string;
  isAvailable: boolean;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface FoodCartItem {
  foodItem: FoodItem;
  quantity: number;
}
