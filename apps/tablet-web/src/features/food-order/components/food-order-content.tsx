'use client';

import type { ReactNode } from 'react';
import { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { StoreFoodCategory, StoreFoodCategoryItem } from '@repo/types';
import { cn } from '@repo/ui';
import { FoodList } from './food-list';
import { CartSheet } from './cart-sheet';
import { useCartStore } from '../stores/cart-store';
import type { FoodItem } from '../types';

interface Props {
  categories: StoreFoodCategory[];
  foodsByCategory: Record<string, StoreFoodCategoryItem[]>;
  isSessionActive: boolean;
}

function mapToFoodItem(food: StoreFoodCategoryItem, categoryId: string): FoodItem {
  return {
    id: food.id,
    categoryId,
    name: food.name,
    description: food.description,
    price: food.price,
    thumbnail: food.imageUrl ?? undefined,
    isAvailable: true,
    isPopular: food.isPopular,
    isNew: food.isNew,
  };
}

export function FoodOrderContent({ categories, foodsByCategory, isSessionActive }: Props): ReactNode {
  const t = useTranslations('FoodOrder');
  const locale = useLocale();
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const addItem = useCartStore(state => state.addItem);

  const allCategories = useMemo(() => {
    const allCategory: StoreFoodCategory = {
      id: 'all',
      storeId: categories[0]?.storeId ?? '',
      name: locale === 'ko' ? '전체' : 'All',
    };
    return [allCategory, ...categories];
  }, [categories, locale]);

  const filteredFoods = useMemo(() => {
    if (selectedCategoryId === 'all') {
      return Object.entries(foodsByCategory).flatMap(([categoryId, foods]) =>
        foods.map(food => mapToFoodItem(food, categoryId))
      );
    }
    const foods = foodsByCategory[selectedCategoryId] ?? [];
    return foods.map(food => mapToFoodItem(food, selectedCategoryId));
  }, [selectedCategoryId, foodsByCategory]);

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h1 className="text-2xl font-bold text-foreground">{t('pageTitle')}</h1>
        {isSessionActive && <CartSheet />}
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden p-6">
        <aside className="w-48 shrink-0 overflow-auto">
          <nav className="flex h-full flex-col gap-2">
            {allCategories.map(category => {
              const isSelected = category.id === selectedCategoryId;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={cn(
                    'rounded-xl px-4 py-3 text-left transition-colors',
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground hover:bg-muted'
                  )}
                >
                  <span className="font-medium">{category.name}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">
          <FoodList foods={filteredFoods} onAddToCart={addItem} hideAddButton={!isSessionActive} />
        </main>
      </div>
    </div>
  );
}
