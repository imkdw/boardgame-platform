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
import { getFoods, getFoodsByCategory, type Food } from '@/lib/foods';
import { getFoodCategories, type FoodCategory } from '@/lib/food-categories';
import { getStores, type Store } from '@/lib/stores';
import { getApiErrorMessage } from '@repo/web-shared';
import { FoodCategoryList } from './food-category-list';
import { FoodList } from './food-list';

export function FoodsPageClient(): ReactNode {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [allFoods, setAllFoods] = useState<Food[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [isFoodsLoading, setIsFoodsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = useCallback(async () => {
    try {
      setError(null);
      const data = await getStores();
      setStores(data);
      const firstStore = data[0];
      if (firstStore) {
        setSelectedStoreId(firstStore.id);
      }
    } catch (e) {
      const message = getApiErrorMessage(e);
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async (storeId: string) => {
    if (!storeId) return;

    try {
      setIsCategoriesLoading(true);
      setError(null);
      const data = await getFoodCategories(storeId);
      setCategories(data);
    } catch (e) {
      const message = getApiErrorMessage(e);
      setError(message);
      toast.error(message);
    } finally {
      setIsCategoriesLoading(false);
    }
  }, []);

  const fetchFoods = useCallback(async (storeId: string, categoryId: string | null) => {
    if (!storeId) return;

    try {
      setIsFoodsLoading(true);
      setError(null);

      let data: Food[];
      if (categoryId) {
        data = await getFoodsByCategory(storeId, categoryId);
      } else {
        data = await getFoods(storeId);
      }

      setFoods(data);

      // Also fetch all foods for count calculation if viewing specific category
      if (categoryId) {
        const allData = await getFoods(storeId);
        setAllFoods(allData);
      } else {
        setAllFoods(data);
      }
    } catch (e) {
      const message = getApiErrorMessage(e);
      setError(message);
      toast.error(message);
    } finally {
      setIsFoodsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  useEffect(() => {
    if (selectedStoreId) {
      fetchCategories(selectedStoreId);
      setSelectedCategoryId(null);
    }
  }, [selectedStoreId, fetchCategories]);

  useEffect(() => {
    if (selectedStoreId) {
      fetchFoods(selectedStoreId, selectedCategoryId);
    }
  }, [selectedStoreId, selectedCategoryId, fetchFoods]);

  const handleRefresh = useCallback(() => {
    if (selectedStoreId) {
      fetchFoods(selectedStoreId, selectedCategoryId);
    }
  }, [selectedStoreId, selectedCategoryId, fetchFoods]);

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
  categories.forEach((cat) => {
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
              {stores.map((store) => (
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
                  ? categories.find((c) => c.id === selectedCategoryId)?.name ?? '메뉴 목록'
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
