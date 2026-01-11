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
import { DoorOpen, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getStores } from '@/features/stores';
import { getStoreRooms } from '../lib';
import { getApiErrorMessage } from '@repo/api-error';
import { useAsyncAction } from '@repo/web-shared';
import { CreateStoreRoomDialog } from './create-store-room-dialog';
import { StoreRoomTable } from './store-room-table';
import type { Store, StoreRoom } from '@repo/types';

export function StoreRoomsPageClient(): ReactNode {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');
  const [rooms, setRooms] = useState<StoreRoom[]>([]);
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

  const { execute: executeFetchRooms, isPending: isRoomsLoading } = useAsyncAction(
    async (storeId: string) => {
      if (!storeId) return [];
      setError(null);
      return getStoreRooms(storeId);
    },
    {
      toast,
      onSuccess: data => {
        setRooms(data);
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
      executeFetchRooms(selectedStoreId);
    }
  }, [selectedStoreId, executeFetchRooms]);

  const handleRefresh = useCallback(() => {
    if (selectedStoreId) {
      executeFetchRooms(selectedStoreId);
    }
  }, [selectedStoreId, executeFetchRooms]);

  const handleStoreChange = useCallback((value: string) => {
    setSelectedStoreId(value);
    setRooms([]);
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
        <DoorOpen className="mb-4 size-12" />
        <p>먼저 매장을 등록해주세요.</p>
        <p className="text-sm">방은 매장별로 관리됩니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">방 관리</h1>
          <p className="text-muted-foreground">매장별 방을 관리합니다.</p>
        </div>
        <CreateStoreRoomDialog storeId={selectedStoreId} onSuccess={handleRefresh} />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">매장 선택</CardTitle>
          <CardDescription>방을 관리할 매장을 선택하세요.</CardDescription>
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
          <CardTitle>방 목록</CardTitle>
          <CardDescription>총 {rooms.length}개의 방이 등록되어 있습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-8 text-center text-destructive">
              <p>{error}</p>
              <p className="mt-2 text-sm text-muted-foreground">API 서버가 실행 중인지 확인해주세요.</p>
            </div>
          ) : isRoomsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <StoreRoomTable storeId={selectedStoreId} rooms={rooms} onRefresh={handleRefresh} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
