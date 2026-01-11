export interface Food {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  isPopular: boolean;
  isNew: boolean;
  imageUrl: string | null;
}
