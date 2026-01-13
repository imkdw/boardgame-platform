'use client';

import { useEffect, useRef, useCallback } from 'react';
import { SSE_EVENT_TYPES } from '@repo/consts';
import type { RoomStatusEvent } from '@repo/types';

interface UseRoomStatusSseOptions {
  storeId: string | null;
  roomId: string | null;
  onRoomStatusChanged: (event: RoomStatusEvent) => void;
  enabled?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/v1';

export function useRoomStatusSse({
  storeId,
  roomId,
  onRoomStatusChanged,
  enabled = true,
}: UseRoomStatusSseOptions) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (!storeId || !enabled) return;

    // 기존 연결 종료
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const url = `${API_BASE_URL}/stores/${storeId}/sse/room-status`;
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener(SSE_EVENT_TYPES.ROOM_STATUS_CHANGED, event => {
      try {
        const data = JSON.parse(event.data) as RoomStatusEvent;
        // 현재 방에 대한 이벤트만 처리
        if (roomId && data.roomId === roomId) {
          onRoomStatusChanged(data);
        }
      } catch {
        // JSON 파싱 실패 무시
      }
    });

    eventSource.addEventListener(SSE_EVENT_TYPES.HEARTBEAT, () => {
      // Heartbeat 수신 - 연결 유지 확인
    });

    eventSource.onerror = () => {
      eventSource.close();
      eventSourceRef.current = null;

      // 5초 후 재연결 시도
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, 5000);
    };
  }, [storeId, roomId, onRoomStatusChanged, enabled]);

  useEffect(() => {
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
