export interface CreateFoodDto {
  categoryId: string;
  name: string;
  description: string;
  price: number;
  isPopular: boolean;
  isNew: boolean;
  imageUrl: string | null;
}

export interface UpdateFoodDto {
  name: string;
  description: string;
  price: number;
  isPopular: boolean;
  isNew: boolean;
  imageUrl: string | null;
}
