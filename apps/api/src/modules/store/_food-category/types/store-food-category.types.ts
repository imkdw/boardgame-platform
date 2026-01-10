import { StoreFoodCategoryItem, StoreFood } from '@prisma/client';

export type CategoryItemWithFood = StoreFoodCategoryItem & { food: StoreFood };
