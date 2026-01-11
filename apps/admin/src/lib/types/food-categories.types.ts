export interface FoodCategory {
  id: string;
  storeId: string;
  name: string;
}

export interface CreateFoodCategoryDto {
  name: string;
}

export interface UpdateFoodCategoryDto {
  name: string;
}
