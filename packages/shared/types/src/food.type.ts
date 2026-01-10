/**
 * 음식 카테고리 타입
 */
export interface FoodCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  order: number;
}

/**
 * 음식 아이템 타입
 */
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

/**
 * 장바구니 아이템 타입
 */
export interface FoodCartItem {
  foodItem: FoodItem;
  quantity: number;
}
