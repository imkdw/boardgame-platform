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
import { getFoodCategories, getStores } from '@/lib';
import type { FoodCategory } from '@repo/types';
import { getApiErrorMessage } from '@repo/api-error';
import { useAsyncAction } from '@repo/web-shared';
import { CreateFoodCategoryDialog } from './create-food-category-dialog';
import { FoodCategoryTable } from './food-category-table';
import type { Store } from '@repo/types';

export function FoodCategoriesPageClient(): ReactNode {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');
  const [categories, setCategories] = useState<FoodCategory[]>([]);
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

  useEffect(() => {
    executeFetchStores();
  }, [executeFetchStores]);

  useEffect(() => {
    if (selectedStoreId) {
      executeFetchCategories(selectedStoreId);
    }
  }, [selectedStoreId, executeFetchCategories]);

  const handleRefresh = useCallback(() => {
    if (selectedStoreId) {
      executeFetchCategories(selectedStoreId);
    }
  }, [selectedStoreId, executeFetchCategories]);

  const handleStoreChange = useCallback((value: string) => {
    setSelectedStoreId(value);
    setCategories([]);
  }, []);

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
        <p className="text-sm">음식 카테고리는 매장별로 관리됩니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">음식 카테고리 관리</h1>
          <p className="text-muted-foreground">매장별 음식 카테고리를 관리합니다.</p>
        </div>
        <CreateFoodCategoryDialog storeId={selectedStoreId} onSuccess={handleRefresh} />
      </div>

      {/* Store Selector */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">매장 선택</CardTitle>
          <CardDescription>음식 카테고리를 관리할 매장을 선택하세요.</CardDescription>
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

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 카테고리</CardDescription>
            <CardTitle className="text-3xl">{categories.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>선택된 매장</CardDescription>
            <CardTitle className="text-3xl text-primary">
              {stores.find(s => s.id === selectedStoreId)?.name ?? '-'}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="size-5" />
            <CardTitle>카테고리 목록</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-8 text-center text-destructive">
              <p>{error}</p>
              <p className="mt-2 text-sm text-muted-foreground">API 서버가 실행 중인지 확인해주세요.</p>
            </div>
          ) : isCategoriesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <FoodCategoryTable storeId={selectedStoreId} categories={categories} onRefresh={handleRefresh} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
