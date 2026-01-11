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
import { Gamepad2, Loader2, Star, Package } from 'lucide-react';
import { toast } from 'sonner';
import type { Store, StoreGame } from '@repo/types';
import { getStores, getGames } from '@/lib';
import { getApiErrorMessage, useAsyncAction } from '@repo/web-shared';
import { CreateGameDialog } from './create-game-dialog';
import { GameTable } from './game-table';

export function GamesPageClient(): ReactNode {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');
  const [games, setGames] = useState<StoreGame[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { execute: executeFetchStores, isPending: isLoadingStores } = useAsyncAction(
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

  const { execute: executeFetchGames, isPending: isLoadingGames } = useAsyncAction(
    async (storeId: string) => {
      if (!storeId) return [];
      setError(null);
      return getGames(storeId);
    },
    {
      toast,
      onSuccess: data => {
        setGames(data);
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
      executeFetchGames(selectedStoreId);
    }
  }, [selectedStoreId, executeFetchGames]);

  const handleRefresh = useCallback(() => {
    if (selectedStoreId) {
      executeFetchGames(selectedStoreId);
    }
  }, [selectedStoreId, executeFetchGames]);

  const handleStoreChange = useCallback((value: string) => {
    setSelectedStoreId(value);
    setGames([]);
  }, []);

  const recommendedCount = games.filter(g => g.isRecommended).length;
  const availableCount = games.filter(g => g.availableStock > 0).length;

  if (isLoadingStores) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Gamepad2 className="mb-4 size-12" />
        <p>먼저 매장을 등록해주세요.</p>
        <p className="text-sm">게임은 매장별로 관리됩니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">게임 관리</h1>
          <p className="text-muted-foreground">매장별 보드게임을 관리합니다.</p>
        </div>
        {selectedStoreId && <CreateGameDialog storeId={selectedStoreId} onSuccess={handleRefresh} />}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">매장 선택</CardTitle>
          <CardDescription>게임을 관리할 매장을 선택하세요.</CardDescription>
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 게임</CardDescription>
            <CardTitle className="text-3xl">{games.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              <Star className="size-4" />
              추천 게임
            </CardDescription>
            <CardTitle className="text-3xl text-yellow-500">{recommendedCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              <Package className="size-4" />
              이용 가능
            </CardDescription>
            <CardTitle className="text-3xl text-green-600">{availableCount}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Gamepad2 className="size-5" />
            <CardTitle>게임 목록</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-8 text-center text-destructive">
              <p>{error}</p>
              <p className="mt-2 text-sm text-muted-foreground">API 서버가 실행 중인지 확인해주세요.</p>
            </div>
          ) : isLoadingGames ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <GameTable storeId={selectedStoreId} games={games} onRefresh={handleRefresh} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
