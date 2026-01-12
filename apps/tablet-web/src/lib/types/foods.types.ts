import type { StoreFoodCategory, StoreFoodCategoryItem } from '@repo/types';

export interface StoreFoodData {
  categories: StoreFoodCategory[];
  foodsByCategory: Record<string, StoreFoodCategoryItem[]>;
}
