'use client';

import { cn } from '@repo/ui';
import type { StoreFoodCategory } from '@repo/types';

interface Props {
  categories: StoreFoodCategory[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryList({ categories, selectedCategoryId, onSelectCategory }: Props) {
  return (
    <nav className="flex h-full flex-col gap-2">
      {categories.map(category => {
        const isSelected = category.id === selectedCategoryId;

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              'flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200',
              isSelected
                ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20'
                : 'bg-card text-card-foreground hover:bg-muted/80'
            )}
          >
            <span className="font-medium">{category.name}</span>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-xs font-bold',
                isSelected
                  ? 'bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {category.foodCount}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
