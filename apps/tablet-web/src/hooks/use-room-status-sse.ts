'use client';

import { useEffect, useRef, useCallback } from 'react';
import { SSE_EVENT_TYPES } from '@repo/consts';
import type { RoomStatusEvent } from '@repo/types';

interface UseRoomStatusSseOptions {
  storeId: string | null;
  roomId: string | null;
  onRoomStatusChanged: (event: RoomStatusEvent) => void;
  onReconnected?: () => void;
  enabled?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/v1';

export function useRoomStatusSse({
  storeId,
  roomId,
  onRoomStatusChanged,
  onReconnected,
  enabled = true,
}: UseRoomStatusSseOptions) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstConnectRef = useRef(true);

  const connect = useCallback(() => {
    if (!storeId || !enabled) return;

    // 기존 연결 종료
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const url = `${API_BASE_URL}/stores/${storeId}/sse/room-status`;
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
        const parsed = JSON.parse(event.data) as { data: RoomStatusEvent; type: string };

        if (parsed.type === SSE_EVENT_TYPES.ROOM_STATUS_CHANGED) {
          const data = parsed.data;
          // 현재 방에 대한 이벤트만 처리
          if (roomId && data.roomId === roomId) {
            onRoomStatusChanged(data);
          }
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
  }, [storeId, roomId, onRoomStatusChanged, onReconnected, enabled]);

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
