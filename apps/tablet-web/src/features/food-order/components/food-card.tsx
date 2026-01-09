'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { Badge, Button, cn } from '@repo/ui';
import type { FoodItem } from '../types';

interface Props {
  food: FoodItem;
  onAddToCart: (food: FoodItem) => void;
}

export function FoodCard({ food, onAddToCart }: Props) {
  const locale = useLocale();
  const t = useTranslations('FoodOrder');

  const displayName = locale === 'ko' ? food.name : food.nameEn;
  const displayDescription = locale === 'ko' ? food.description : food.descriptionEn;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card',
        !food.isAvailable && 'opacity-60'
      )}
    >
      <div className="relative aspect-[4/3] w-full bg-muted">
        <Image
          src={food.thumbnail}
          alt={displayName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {food.isPopular && <Badge variant="default">{t('badge.popular')}</Badge>}
          {food.isNew && <Badge variant="new">{t('badge.new')}</Badge>}
          {!food.isAvailable && <Badge variant="error">{t('badge.soldOut')}</Badge>}
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-lg font-bold text-card-foreground">{displayName}</h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{displayDescription}</p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            {food.price.toLocaleString()}
            <span className="text-sm font-normal">{t('currency')}</span>
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
