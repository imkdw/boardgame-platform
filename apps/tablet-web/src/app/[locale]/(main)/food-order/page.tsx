'use client';

import type { ReactNode } from 'react';
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';

import {
  CategoryList,
  FoodList,
  CartSheet,
  mockCategories,
  mockFoods,
  useCartStore,
} from '@/features/food-order';

export default function FoodOrderPage(): ReactNode {
  const t = useTranslations('FoodOrder');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const addItem = useCartStore(state => state.addItem);

  const filteredFoods = useMemo(() => {
    if (selectedCategoryId === 'all') {
      return mockFoods;
    }
    return mockFoods.filter(food => food.categoryId === selectedCategoryId);
  }, [selectedCategoryId]);

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h1 className="text-2xl font-bold text-foreground">{t('pageTitle')}</h1>
        <CartSheet />
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden p-6">
        <aside className="w-48 shrink-0 overflow-auto">
          <CategoryList
            categories={mockCategories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />
        </aside>

        <main className="flex-1 overflow-auto">
          <FoodList foods={filteredFoods} onAddToCart={addItem} />
        </main>
      </div>
    </div>
  );
}
