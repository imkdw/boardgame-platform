'use client';

import { useEffect, useRef, useCallback } from 'react';
import { SSE_EVENT_TYPES } from '@repo/consts';
import type { FoodOrderCreatedEvent, FoodOrderStatusChangedEvent } from '@repo/types';
import { API_BASE_URL } from '@/lib/api';

interface UseFoodOrderSseOptions {
  storeId: string | null;
  onFoodOrderCreated: (event: FoodOrderCreatedEvent) => void;
  onFoodOrderStatusChanged: (event: FoodOrderStatusChangedEvent) => void;
  onReconnected?: () => void;
  enabled?: boolean;
}

export function useFoodOrderSse({
  storeId,
  onFoodOrderCreated,
  onFoodOrderStatusChanged,
  onReconnected,
  enabled = true,
}: UseFoodOrderSseOptions) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstConnectRef = useRef(true);

  const connect = useCallback(() => {
    if (!storeId || !enabled) return;

    // 기존 연결 종료
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const url = `${API_BASE_URL}/stores/${storeId}/sse/food-orders`;
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      // 재연결 시 (첫 연결이 아닌 경우) 콜백 호출
      if (!isFirstConnectRef.current && onReconnected) {
        onReconnected();
      }
      isFirstConnectRef.current = false;
    };

    // NestJS SSE는 type을 event: 라인이 아닌 data 내부에 포함시키므로
    // onmessage로 모든 이벤트를 받아서 type을 직접 파싱
    eventSource.onmessage = event => {
      try {
        const parsed = JSON.parse(event.data) as
          | { data: FoodOrderCreatedEvent; type: string }
          | { data: FoodOrderStatusChangedEvent; type: string };

        if (parsed.type === SSE_EVENT_TYPES.FOOD_ORDER_CREATED) {
          const data = parsed.data as FoodOrderCreatedEvent;
          onFoodOrderCreated(data);
        } else if (parsed.type === SSE_EVENT_TYPES.FOOD_ORDER_STATUS_CHANGED) {
          const data = parsed.data as FoodOrderStatusChangedEvent;
          onFoodOrderStatusChanged(data);
        }
        // HEARTBEAT는 별도 처리 불필요
      } catch {
        // JSON 파싱 실패 무시
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      eventSourceRef.current = null;

      // 5초 후 재연결 시도
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, 5000);
    };
  }, [storeId, onFoodOrderCreated, onFoodOrderStatusChanged, onReconnected, enabled]);

  useEffect(() => {
    isFirstConnectRef.current = true;
    connect();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [connect]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  return { disconnect };
}
