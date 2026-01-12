'use client';

import { useLocale } from 'next-intl';
import { cn } from '@repo/ui';
import type { FoodCategory } from '../types';

interface Props {
  categories: FoodCategory[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryList({ categories, selectedCategoryId, onSelectCategory }: Props) {
  const locale = useLocale();

  return (
    <nav className="flex h-full flex-col gap-2">
      {categories.map(category => {
        const isSelected = category.id === selectedCategoryId;
        const displayName = locale === 'ko' ? category.name : category.nameEn;

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              'flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors',
              isSelected ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground hover:bg-muted'
            )}
          >
            <span className="font-medium">{displayName}</span>
          </button>
        );
      })}
    </nav>
  );
}
