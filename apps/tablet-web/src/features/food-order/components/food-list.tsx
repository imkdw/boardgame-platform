'use client';

import { useTranslations } from 'next-intl';
import type { FoodItem } from '../types';
import { FoodCard } from './food-card';

interface Props {
  foods: FoodItem[];
  onAddToCart: (food: FoodItem) => void;
  hideAddButton?: boolean;
}

export function FoodList({ foods, onAddToCart, hideAddButton }: Props) {
  const t = useTranslations('FoodOrder');

  if (foods.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">{t('empty')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {foods.map(food => (
        <FoodCard key={food.id} food={food} onAddToCart={onAddToCart} hideAddButton={hideAddButton} />
      ))}
    </div>
  );
}
