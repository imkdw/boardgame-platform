'use client';

import { useEffect, useState, useCallback, type ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui';
import { Building2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getStores, type Store } from '@/lib/stores';
import { getApiErrorMessage, useAsyncAction } from '@repo/web-shared';
import { CreateStoreDialog } from './create-store-dialog';
import { StoreTable } from './store-table';

export function StoresPageClient(): ReactNode {
  const [stores, setStores] = useState<Store[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { execute: executeFetchStores, isPending: isLoading } = useAsyncAction(
    async () => {
      setError(null);
      return getStores();
    },
    {
      toast,
      onSuccess: (data) => {
        setStores(data);
      },
      onError: (error) => {
        setError(getApiErrorMessage(error));
      },
    }
  );

  useEffect(() => {
    executeFetchStores();
  }, [executeFetchStores]);

  const handleRefresh = useCallback(() => {
    executeFetchStores();
  }, [executeFetchStores]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">매장 관리</h1>
          <p className="text-muted-foreground">전체 매장 목록 및 관리</p>
        </div>
        <CreateStoreDialog onSuccess={handleRefresh} />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 매장</CardDescription>
            <CardTitle className="text-3xl">{stores.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>등록된 와이파이</CardDescription>
            <CardTitle className="text-3xl text-primary">
              {stores.filter((s) => s.wifiName).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>영상 등록</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {stores.filter((s) => s.introVideoUrl).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Building2 className="size-5" />
            <CardTitle>매장 목록</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-8 text-center text-destructive">
              <p>{error}</p>
              <p className="mt-2 text-sm text-muted-foreground">API 서버가 실행 중인지 확인해주세요.</p>
            </div>
          ) : (
            <StoreTable stores={stores} onRefresh={handleRefresh} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
