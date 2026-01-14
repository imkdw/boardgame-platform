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
  Badge,
  Button,
  cn,
} from '@repo/ui';
import { ShoppingBag, Loader2, Clock, ChefHat, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { FOOD_ORDER_STATUS, type FoodOrderStatus } from '@repo/consts';
import type { FoodOrder, Store, FoodOrderCreatedEvent, FoodOrderStatusChangedEvent } from '@repo/types';
import { getStores } from '@/features/stores';
import { getFoodOrders, updateFoodOrderStatus } from '../lib';
import { getApiErrorMessage } from '@repo/api-error';
import { useAsyncAction } from '@repo/web-shared';
import { useFoodOrderSse } from '../hooks/use-food-order-sse';

const ALL_STATUS_VALUE = 'all';

const STATUS_OPTIONS = [
  { value: ALL_STATUS_VALUE, label: '전체' },
  { value: FOOD_ORDER_STATUS.PENDING, label: '주문 대기' },
  { value: FOOD_ORDER_STATUS.CONFIRMED, label: '주문 확인' },
  { value: FOOD_ORDER_STATUS.PREPARING, label: '조리 중' },
  { value: FOOD_ORDER_STATUS.READY, label: '조리 완료' },
  { value: FOOD_ORDER_STATUS.COMPLETED, label: '서빙 완료' },
  { value: FOOD_ORDER_STATUS.CANCELLED, label: '취소' },
] as const;

function getStatusBadgeVariant(status: FoodOrderStatus): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case FOOD_ORDER_STATUS.PENDING:
      return 'secondary';
    case FOOD_ORDER_STATUS.CONFIRMED:
    case FOOD_ORDER_STATUS.PREPARING:
      return 'default';
    case FOOD_ORDER_STATUS.READY:
      return 'outline';
    case FOOD_ORDER_STATUS.COMPLETED:
      return 'secondary';
    case FOOD_ORDER_STATUS.CANCELLED:
      return 'destructive';
    default:
      return 'default';
  }
}

function getStatusLabel(status: FoodOrderStatus): string {
  return STATUS_OPTIONS.find(opt => opt.value === status)?.label ?? status;
}

function getStatusIcon(status: FoodOrderStatus): ReactNode {
  switch (status) {
    case FOOD_ORDER_STATUS.PENDING:
      return <Clock className="size-4" />;
    case FOOD_ORDER_STATUS.CONFIRMED:
    case FOOD_ORDER_STATUS.PREPARING:
      return <ChefHat className="size-4" />;
    case FOOD_ORDER_STATUS.READY:
    case FOOD_ORDER_STATUS.COMPLETED:
      return <CheckCircle className="size-4" />;
    case FOOD_ORDER_STATUS.CANCELLED:
      return <XCircle className="size-4" />;
    default:
      return null;
  }
}

function getNextStatus(currentStatus: FoodOrderStatus): FoodOrderStatus | null {
  switch (currentStatus) {
    case FOOD_ORDER_STATUS.PENDING:
      return FOOD_ORDER_STATUS.CONFIRMED;
    case FOOD_ORDER_STATUS.CONFIRMED:
      return FOOD_ORDER_STATUS.PREPARING;
    case FOOD_ORDER_STATUS.PREPARING:
      return FOOD_ORDER_STATUS.READY;
    case FOOD_ORDER_STATUS.READY:
      return FOOD_ORDER_STATUS.COMPLETED;
    default:
      return null;
  }
}

function getNextStatusLabel(currentStatus: FoodOrderStatus): string | null {
  const next = getNextStatus(currentStatus);
  return next ? getStatusLabel(next) : null;
}

export function FoodOrdersPageClient(): ReactNode {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>(ALL_STATUS_VALUE);
  const [orders, setOrders] = useState<FoodOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { execute: executeFetchStores, isPending: isStoresLoading } = useAsyncAction(
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

  const { execute: executeFetchOrders, isPending: isOrdersLoading } = useAsyncAction(
    async (storeId: string, status: string) => {
      if (!storeId) return [];
      setError(null);
      const statusParam = status === ALL_STATUS_VALUE ? '' : status;
      return getFoodOrders(storeId, statusParam as FoodOrderStatus);
    },
    {
      toast,
      onSuccess: data => {
        setOrders(data);
      },
      onError: error => {
        setError(getApiErrorMessage(error));
      },
    }
  );

  const { execute: executeUpdateStatus, isPending: isUpdating } = useAsyncAction(
    async (orderId: string, status: FoodOrderStatus) => {
      if (!selectedStoreId) return;
      return updateFoodOrderStatus(selectedStoreId, orderId, status);
    },
    {
      toast,
      successMessage: '주문 상태가 변경되었습니다.',
      onSuccess: () => {
        // 상태 변경 성공 시 목록 새로고침 (SSE로도 업데이트되지만 즉시 반영)
        executeFetchOrders(selectedStoreId, selectedStatus);
      },
      onError: error => {
        toast.error('상태 변경 실패', {
          description: getApiErrorMessage(error),
        });
      },
    }
  );

  const handleFoodOrderCreated = useCallback(
    (event: FoodOrderCreatedEvent) => {
      // 필터 조건과 일치하는 경우만 추가
      if (selectedStatus === ALL_STATUS_VALUE || event.order.status === selectedStatus) {
        setOrders(prev => [event.order, ...prev]);
        toast.success('새로운 주문이 도착했습니다.', {
          description: `방 ${event.order.roomNumber}번`,
        });
      }
    },
    [selectedStatus]
  );

  const handleFoodOrderStatusChanged = useCallback((event: FoodOrderStatusChangedEvent) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === event.orderId
          ? {
              ...order,
              status: event.status,
              updatedAt: event.updatedAt,
            }
          : order
      )
    );
  }, []);

  const handleReconnected = useCallback(() => {
    if (selectedStoreId) {
      executeFetchOrders(selectedStoreId, selectedStatus);
    }
  }, [selectedStoreId, selectedStatus, executeFetchOrders]);

  useFoodOrderSse({
    storeId: selectedStoreId || null,
    onFoodOrderCreated: handleFoodOrderCreated,
    onFoodOrderStatusChanged: handleFoodOrderStatusChanged,
    onReconnected: handleReconnected,
    enabled: !!selectedStoreId,
  });

  useEffect(() => {
    executeFetchStores();
  }, [executeFetchStores]);

  useEffect(() => {
    if (selectedStoreId) {
      executeFetchOrders(selectedStoreId, selectedStatus);
    }
  }, [selectedStoreId, selectedStatus, executeFetchOrders]);

  const handleStoreChange = useCallback((value: string) => {
    setSelectedStoreId(value);
    setOrders([]);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setSelectedStatus(value);
  }, []);

  const handleStatusUpdate = useCallback(
    (orderId: string, currentStatus: FoodOrderStatus) => {
      const nextStatus = getNextStatus(currentStatus);
      if (nextStatus) {
        executeUpdateStatus(orderId, nextStatus);
      }
    },
    [executeUpdateStatus]
  );

  const handleCancelOrder = useCallback(
    (orderId: string) => {
      executeUpdateStatus(orderId, FOOD_ORDER_STATUS.CANCELLED);
    },
    [executeUpdateStatus]
  );

  if (isStoresLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <ShoppingBag className="mb-4 size-12" />
        <p>먼저 매장을 등록해주세요.</p>
        <p className="text-sm">주문은 매장별로 관리됩니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">주문 관리</h1>
        <p className="text-muted-foreground">매장별 음식 주문을 실시간으로 관리합니다.</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">필터</CardTitle>
          <CardDescription>매장과 상태를 선택하세요.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="w-64">
            <label className="mb-2 block text-sm font-medium">매장</label>
            <Select value={selectedStoreId} onValueChange={handleStoreChange}>
              <SelectTrigger>
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
          </div>
          <div className="w-48">
            <label className="mb-2 block text-sm font-medium">상태</label>
            <Select value={selectedStatus} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">주문 목록</CardTitle>
          <CardDescription>총 {orders.length}개의 주문</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-8 text-center text-destructive">
              <p>{error}</p>
              <p className="mt-2 text-sm text-muted-foreground">API 서버가 실행 중인지 확인해주세요.</p>
            </div>
          ) : isOrdersLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <ShoppingBag className="mb-4 size-12" />
              <p>주문이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => {
                const nextStatusLabel = getNextStatusLabel(order.status);
                const canUpdate =
                  nextStatusLabel &&
                  order.status !== FOOD_ORDER_STATUS.COMPLETED &&
                  order.status !== FOOD_ORDER_STATUS.CANCELLED;

                return (
                  <Card key={order.id} className="overflow-hidden">
                    <div className="flex items-start gap-4 p-4">
                      {/* Left: Order Info */}
                      <div className="flex-1 space-y-3">
                        {/* Header */}
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                            {order.roomNumber}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">방 {order.roomNumber}번</span>
                              <Badge variant={getStatusBadgeVariant(order.status)} className="gap-1">
                                {getStatusIcon(order.status)}
                                {getStatusLabel(order.status)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleString('ko-KR', {
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-1 rounded-lg bg-muted/50 p-3">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between text-sm">
                              <span>
                                {item.foodName} × {item.quantity}
                              </span>
                              <span className="font-medium">{item.totalPrice.toLocaleString()}원</span>
                            </div>
                          ))}
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between border-t pt-3">
                          <span className="font-medium">총 금액</span>
                          <span className="text-lg font-bold">{order.totalPrice.toLocaleString()}원</span>
                        </div>
                      </div>

                      {/* Right: Action Buttons */}
                      <div className="flex flex-col items-end gap-2">
                        {canUpdate && (
                          <Button
                            onClick={() => handleStatusUpdate(order.id, order.status)}
                            disabled={isUpdating}
                            className={cn('min-w-32', isUpdating && 'opacity-50')}
                          >
                            {isUpdating ? (
                              <>
                                <Loader2 className="mr-2 size-4 animate-spin" />
                                처리 중...
                              </>
                            ) : (
                              nextStatusLabel
                            )}
                          </Button>
                        )}
                        {order.status !== FOOD_ORDER_STATUS.COMPLETED &&
                          order.status !== FOOD_ORDER_STATUS.CANCELLED && (
                            <Button
                              variant="outline"
                              onClick={() => handleCancelOrder(order.id)}
                              disabled={isUpdating}
                              className={cn('min-w-32 text-destructive hover:text-destructive', isUpdating && 'opacity-50')}
                            >
                              <XCircle className="mr-2 size-4" />
                              취소
                            </Button>
                          )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
