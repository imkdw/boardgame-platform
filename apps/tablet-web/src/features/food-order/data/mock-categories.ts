import type { FoodCategory } from '../types';

export const mockCategories: FoodCategory[] = [
  {
    id: 'all',
    name: '전체',
    nameEn: 'All',
    icon: 'grid',
    order: 0,
  },
  {
    id: 'rice',
    name: '밥류',
    nameEn: 'Rice',
    icon: 'soup',
    order: 1,
  },
  {
    id: 'snack',
    name: '분식',
    nameEn: 'Snacks',
    icon: 'cookie',
    order: 2,
  },
  {
    id: 'fried',
    name: '튀김류',
    nameEn: 'Fried',
    icon: 'drumstick',
    order: 3,
  },
  {
    id: 'drink',
    name: '음료',
    nameEn: 'Drinks',
    icon: 'cup-soda',
    order: 4,
  },
  {
    id: 'dessert',
    name: '디저트',
    nameEn: 'Desserts',
    icon: 'cake',
    order: 5,
  },
];
