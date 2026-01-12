'use client';

import { useEffect, useState, useCallback, type ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui';
import { UtensilsCrossed, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { StoreFood, Store, FoodCategory } from '@repo/types';
import { getStores } from '@/features/stores';
import { getFoodCategories } from '@/features/food-categories';
import { getFoods, getFoodsByCategory } from '../lib';
import { getApiErrorMessage } from '@repo/api-error';
import { useAsyncAction } from '@repo/web-shared';
import { FoodCategoryList } from './food-category-list';
import { FoodList } from './food-list';

export function FoodsPageClient(): ReactNode {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [foods, setFoods] = useState<StoreFood[]>([]);
  const [allFoods, setAllFoods] = useState<StoreFood[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { execute: executeFetchStores, isPending: isLoading } = useAsyncAction(
    async () => {
      setError(null);
      return getStores();
    },
    {
      toast,
      onSuccess: data => {
        setStores(data);
        if (data[0]) {
          setSelectedStoreId(data[0].id);
        }
      },
      onError: error => {
        setError(getApiErrorMessage(error));
      },
    }
  );

  const { execute: executeFetchCategories, isPending: isCategoriesLoading } = useAsyncAction(
    async (storeId: string) => {
      if (!storeId) return [];
      setError(null);
      return getFoodCategories(storeId);
    },
    {
      toast,
      onSuccess: data => {
        setCategories(data);
      },
      onError: error => {
        setError(getApiErrorMessage(error));
      },
    }
  );

  const { execute: executeFetchFoods, isPending: isFoodsLoading } = useAsyncAction(
    async (storeId: string, categoryId: string | null) => {
      if (!storeId) return { foods: [], allFoods: [] };
      setError(null);

      let data: StoreFood[];
      if (categoryId) {
        data = await getFoodsByCategory(storeId, categoryId);
      } else {
        data = await getFoods(storeId);
      }

      let allData: StoreFood[];
      if (categoryId) {
        allData = await getFoods(storeId);
      } else {
        allData = data;
      }

      return { foods: data, allFoods: allData };
    },
    {
      toast,
      onSuccess: data => {
        setFoods(data.foods);
        setAllFoods(data.allFoods);
      },
      onError: error => {
        setError(getApiErrorMessage(error));
      },
    }
  );

  useEffect(() => {
    executeFetchStores();
  }, [executeFetchStores]);

  useEffect(() => {
    if (selectedStoreId) {
      executeFetchCategories(selectedStoreId);
      setSelectedCategoryId(null);
    }
  }, [selectedStoreId, executeFetchCategories]);

  useEffect(() => {
    if (selectedStoreId) {
      executeFetchFoods(selectedStoreId, selectedCategoryId);
    }
  }, [selectedStoreId, selectedCategoryId, executeFetchFoods]);

  const handleRefresh = useCallback(() => {
    if (selectedStoreId) {
      executeFetchFoods(selectedStoreId, selectedCategoryId);
    }
  }, [selectedStoreId, selectedCategoryId, executeFetchFoods]);

  const handleStoreChange = useCallback((value: string) => {
    setSelectedStoreId(value);
    setCategories([]);
    setFoods([]);
    setAllFoods([]);
    setSelectedCategoryId(null);
  }, []);

  const handleCategorySelect = useCallback((categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  }, []);

  // Calculate food count per category (this is a simplified version -
  // in production you'd want the API to return this)
  const foodCountByCategory: Record<string, number> = {};
  // Note: This is a placeholder - actual counts would need to come from API
  // For now, we'll just show the count when a category is selected
  categories.forEach(cat => {
    foodCountByCategory[cat.id] = 0; // Placeholder
  });
  if (selectedCategoryId === null) {
    // When viewing all, we have total count
    allFoods.forEach(() => {
      // We don't have category info per food in current model
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <UtensilsCrossed className="mb-4 size-12" />
        <p>먼저 매장을 등록해주세요.</p>
        <p className="text-sm">음식 메뉴는 매장별로 관리됩니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">음식 관리</h1>
        <p className="text-muted-foreground">매장별 음식 메뉴를 관리합니다.</p>
      </div>

      {/* Store Selector */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">매장 선택</CardTitle>
          <CardDescription>음식 메뉴를 관리할 매장을 선택하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedStoreId} onValueChange={handleStoreChange}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="매장 선택" />
            </SelectTrigger>
            <SelectContent>
              {stores.map(store => (
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      {error ? (
        <Card>
          <CardContent className="py-8 text-center text-destructive">
            <p>{error}</p>
            <p className="mt-2 text-sm text-muted-foreground">API 서버가 실행 중인지 확인해주세요.</p>
          </CardContent>
        </Card>
      ) : isCategoriesLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          {/* Left: Category List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">카테고리</CardTitle>
            </CardHeader>
            <CardContent>
              <FoodCategoryList
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                foodCountByCategory={foodCountByCategory}
                onSelectCategory={handleCategorySelect}
              />
            </CardContent>
          </Card>

          {/* Right: Food List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {selectedCategoryId
                  ? (categories.find(c => c.id === selectedCategoryId)?.name ?? '메뉴 목록')
                  : '전체 메뉴'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isFoodsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="size-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <FoodList
                  storeId={selectedStoreId}
                  foods={foods}
                  categories={categories}
                  selectedCategoryId={selectedCategoryId}
                  onRefresh={handleRefresh}
                />
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
