'use client';

import { Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { Badge } from './badge';
import { Button } from './button';

export interface FoodCardItem {
  id: string;
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

interface Props {
  food: FoodCardItem;
  locale?: 'ko' | 'en';
  onAddToCart: (food: FoodCardItem) => void;
  labels?: {
    popular?: string;
    new?: string;
    soldOut?: string;
    currency?: string;
  };
  showImage?: boolean;
  className?: string;
}

const defaultLabels = {
  popular: '인기',
  new: 'NEW',
  soldOut: '품절',
  currency: '원',
};

export function FoodCard({
  food,
  locale = 'ko',
  onAddToCart,
  labels = defaultLabels,
  showImage = true,
  className,
}: Props) {
  const mergedLabels = { ...defaultLabels, ...labels };
  const displayName = locale === 'ko' ? food.name : (food.nameEn ?? food.name);
  const displayDescription =
    locale === 'ko' ? food.description : (food.descriptionEn ?? food.description);

  if (!showImage) {
    // POS용 간단한 카드 (이미지 없음)
    return (
      <div
        data-slot="food-card"
        className={cn(
          'overflow-hidden rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md',
          !food.isAvailable && 'opacity-60',
          className
        )}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-1 flex flex-wrap justify-center gap-1">
            {food.isPopular && <Badge variant="default">{mergedLabels.popular}</Badge>}
            {food.isNew && <Badge variant="new">{mergedLabels.new}</Badge>}
            {!food.isAvailable && <Badge variant="error">{mergedLabels.soldOut}</Badge>}
          </div>
          <h3 className="font-medium text-card-foreground">{displayName}</h3>
          <p className="mt-1 text-lg font-bold text-primary">
            {food.price.toLocaleString()}
            {mergedLabels.currency}
          </p>
          <Button
            variant="outline"
            size="icon"
            className="mt-3"
            disabled={!food.isAvailable}
            onClick={() => onAddToCart(food)}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  // tablet-web용 풀 카드 (이미지 포함)
  return (
    <div
      data-slot="food-card"
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card',
        !food.isAvailable && 'opacity-60',
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full bg-muted">
        {food.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={food.thumbnail} alt={displayName} className="h-full w-full object-cover" />
        )}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {food.isPopular && <Badge variant="default">{mergedLabels.popular}</Badge>}
          {food.isNew && <Badge variant="new">{mergedLabels.new}</Badge>}
          {!food.isAvailable && <Badge variant="error">{mergedLabels.soldOut}</Badge>}
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-lg font-bold text-card-foreground">{displayName}</h3>
        {displayDescription && (
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{displayDescription}</p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            {food.price.toLocaleString()}
            <span className="text-sm font-normal">{mergedLabels.currency}</span>
          </span>
          <Button
            variant="default"
            size="icon"
            disabled={!food.isAvailable}
            onClick={() => onAddToCart(food)}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
