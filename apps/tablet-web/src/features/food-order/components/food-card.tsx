'use client';

import { useLocale, useTranslations } from 'next-intl';
import { FoodCard as BaseFoodCard, type FoodCardItem } from '@repo/ui';
import type { FoodItem } from '../types';

interface Props {
  food: FoodItem;
  onAddToCart: (food: FoodItem) => void;
}

export function FoodCard({ food, onAddToCart }: Props) {
  const locale = useLocale() as 'ko' | 'en';
  const t = useTranslations('FoodOrder');

  // FoodItem을 FoodCardItem으로 변환
  const foodCardItem: FoodCardItem = {
    id: food.id,
    name: food.name,
    nameEn: food.nameEn,
    description: food.description,
    descriptionEn: food.descriptionEn,
    price: food.price,
    thumbnail: food.thumbnail,
    isAvailable: food.isAvailable,
    isPopular: food.isPopular,
    isNew: food.isNew,
  };

  const handleAddToCart = () => {
    onAddToCart(food);
  };

  return (
    <BaseFoodCard
      food={foodCardItem}
      locale={locale}
      onAddToCart={handleAddToCart}
      labels={{
        popular: t('badge.popular'),
        new: t('badge.new'),
        soldOut: t('badge.soldOut'),
        currency: t('currency'),
      }}
      showImage={true}
    />
  );
}
