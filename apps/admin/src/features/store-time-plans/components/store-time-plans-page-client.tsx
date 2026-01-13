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
import { Clock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getStores } from '@/features/stores';
import { getStoreTimePlans } from '../lib';
import { getApiErrorMessage } from '@repo/api-error';
import { useAsyncAction } from '@repo/web-shared';
import { CreateStoreTimePlanDialog } from './create-store-time-plan-dialog';
import { StoreTimePlanTable } from './store-time-plan-table';
import type { Store, StoreTimePlan } from '@repo/types';

export function StoreTimePlansPageClient(): ReactNode {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');
  const [timePlans, setTimePlans] = useState<StoreTimePlan[]>([]);
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

  const { execute: executeFetchTimePlans, isPending: isTimePlansLoading } = useAsyncAction(
    async (storeId: string) => {
      if (!storeId) return [];
      setError(null);
      return getStoreTimePlans(storeId);
    },
    {
      toast,
      onSuccess: data => {
        setTimePlans(data);
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
      executeFetchTimePlans(selectedStoreId);
    }
  }, [selectedStoreId, executeFetchTimePlans]);

  const handleRefresh = useCallback(() => {
    if (selectedStoreId) {
      executeFetchTimePlans(selectedStoreId);
    }
  }, [selectedStoreId, executeFetchTimePlans]);

  const handleStoreChange = useCallback((value: string) => {
    setSelectedStoreId(value);
    setTimePlans([]);
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
        <Clock className="mb-4 size-12" />
        <p>먼저 매장을 등록해주세요.</p>
        <p className="text-sm">시간제 플랜은 매장별로 관리됩니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">시간제 관리</h1>
          <p className="text-muted-foreground">매장별 시간제 플랜을 관리합니다.</p>
        </div>
        <CreateStoreTimePlanDialog storeId={selectedStoreId} onSuccess={handleRefresh} />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">매장 선택</CardTitle>
          <CardDescription>시간제 플랜을 관리할 매장을 선택하세요.</CardDescription>
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

      <Card>
        <CardHeader>
          <CardTitle>시간제 플랜 목록</CardTitle>
          <CardDescription>총 {timePlans.length}개의 시간제 플랜이 등록되어 있습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-8 text-center text-destructive">
              <p>{error}</p>
              <p className="mt-2 text-sm text-muted-foreground">API 서버가 실행 중인지 확인해주세요.</p>
            </div>
          ) : isTimePlansLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <StoreTimePlanTable storeId={selectedStoreId} timePlans={timePlans} onRefresh={handleRefresh} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
