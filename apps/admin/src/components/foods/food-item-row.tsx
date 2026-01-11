'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { Badge } from '@repo/ui';
import type { Food, FoodCategory } from '@/components/stores/lib';
import { EditFoodDialog } from './edit-food-dialog';
import { DeleteFoodDialog } from './delete-food-dialog';

interface Props {
  storeId: string;
  food: Food;
  category?: FoodCategory;
  onRefresh: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
}

export function FoodItemRow({ storeId, food, category, onRefresh }: Props): ReactNode {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-4">
        {/* Food Image or Placeholder */}
        <div className="relative flex size-16 items-center justify-center overflow-hidden rounded-lg bg-muted">
          {food.imageUrl ? (
            <Image src={food.imageUrl} alt={food.name} fill className="object-cover" />
          ) : (
            <span className="text-2xl">🍽️</span>
          )}
        </div>

        {/* Food Info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {category && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {category.name}
              </span>
            )}
            <span className="font-medium">{food.name}</span>
            {food.isPopular && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                BEST
              </Badge>
            )}
            {food.isNew && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                NEW
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">{food.description}</p>
          <p className="font-semibold text-primary">{formatPrice(food.price)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <EditFoodDialog storeId={storeId} food={food} onSuccess={onRefresh} />
        <DeleteFoodDialog storeId={storeId} food={food} onSuccess={onRefresh} />
      </div>
    </div>
  );
}
