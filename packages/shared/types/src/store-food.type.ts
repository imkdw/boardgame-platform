export interface StoreFood {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  isPopular: boolean;
  isNew: boolean;
  imageUrl: string | null;
}

export interface StoreFoodCategory {
  id: string;
  storeId: string;
  name: string;
  foodCount: number;
}

export interface StoreFoodCategoryItem extends StoreFood {
  order: number;
}
