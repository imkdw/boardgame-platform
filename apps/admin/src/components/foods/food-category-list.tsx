'use client';

import type { ReactNode } from 'react';
import { cn } from '@repo/ui';
import { UtensilsCrossed } from 'lucide-react';
import type { FoodCategory } from '@repo/types';

interface Props {
  categories: FoodCategory[];
  selectedCategoryId: string | null;
  foodCountByCategory: Record<string, number>;
  onSelectCategory: (categoryId: string | null) => void;
}

export function FoodCategoryList({
  categories,
  selectedCategoryId,
  foodCountByCategory,
  onSelectCategory,
}: Props): ReactNode {
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <UtensilsCrossed className="mb-2 size-8" />
        <p className="text-sm">등록된 카테고리가 없습니다.</p>
      </div>
    );
  }

  const totalFoods = Object.values(foodCountByCategory).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-1">
      {/* All categories option */}
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        className={cn(
          'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
          selectedCategoryId === null && 'bg-primary/10 text-primary font-medium'
        )}
      >
        <span>전체 메뉴</span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{totalFoods}</span>
      </button>

      {/* Category items */}
      {categories.map(category => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
            selectedCategoryId === category.id && 'bg-primary/10 text-primary font-medium'
          )}
        >
          <span>{category.name}</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
            {foodCountByCategory[category.id] ?? 0}
          </span>
        </button>
      ))}
    </div>
  );
}
