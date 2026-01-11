'use client';

import type { ReactNode } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import type { Food, FoodCategory } from '@/components/stores/lib';
import { CreateFoodDialog } from './create-food-dialog';
import { FoodItemRow } from './food-item-row';

interface Props {
  storeId: string;
  foods: Food[];
  categories: FoodCategory[];
  selectedCategoryId: string | null;
  onRefresh: () => void;
}

export function FoodList({ storeId, foods, categories, selectedCategoryId, onRefresh }: Props): ReactNode {
  // When viewing a specific category, we can show that category for all foods
  const selectedCategory = selectedCategoryId ? categories.find(c => c.id === selectedCategoryId) : undefined;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          총 <span className="font-semibold text-foreground">{foods.length}</span>개의 메뉴가 있습니다
        </p>
        <CreateFoodDialog
          storeId={storeId}
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSuccess={onRefresh}
        />
      </div>

      {/* Food List */}
      {foods.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <UtensilsCrossed className="mb-4 size-12" />
          <p>등록된 메뉴가 없습니다.</p>
          <p className="text-sm">새 메뉴를 추가해주세요.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {foods.map(food => (
            <FoodItemRow
              key={food.id}
              storeId={storeId}
              food={food}
              category={selectedCategory}
              onRefresh={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}
