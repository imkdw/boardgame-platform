'use client';

import type { ReactNode } from 'react';
import { useEffect, useCallback, useRef } from 'react';
import { STORE_ROOM_STATUS } from '@repo/consts';
import type { RoomStatusEvent } from '@repo/types';
import { useSessionStore } from '@/stores';
import { useRoomStatusSse } from '@/hooks/use-room-status-sse';
import { getActiveSession, getRoomById } from '@/lib/session-api';

interface Props {
  children: ReactNode;
  storeId: string;
  roomId: string;
}

export function SessionProvider({ children, storeId, roomId }: Props) {
  const { startSession, endSession, isActive, decrementRemainingSeconds } = useSessionStore();
  const isLoadingRef = useRef(false);

  // 초기 세션 로드
  useEffect(() => {
    async function loadSession() {
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;

      try {
        const [activeSession, room] = await Promise.all([
          getActiveSession(storeId, roomId),
          getRoomById(storeId, roomId),
        ]);

        if (activeSession) {
          startSession(activeSession, room);
        }
      } catch {
        // 초기 로드 실패 - 세션 없이 시작
      } finally {
        isLoadingRef.current = false;
      }
    }

    loadSession();
  }, [storeId, roomId, startSession]);

  // 타이머 (1초마다 남은 시간 감소)
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      decrementRemainingSeconds();
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, decrementRemainingSeconds]);

  // SSE 이벤트 핸들러 - useRef로 최신 함수 참조 유지
  const startSessionRef = useRef(startSession);
  const endSessionRef = useRef(endSession);
  startSessionRef.current = startSession;
  endSessionRef.current = endSession;

  const handleRoomStatusChanged = useCallback(
    async (event: RoomStatusEvent) => {
      // 방 상태가 IN_USE로 변경되었을 때 (키오스크에서 예약됨)
      if (event.status === STORE_ROOM_STATUS.IN_USE && event.sessionId) {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;

        try {
          const [activeSession, room] = await Promise.all([
            getActiveSession(storeId, roomId),
            getRoomById(storeId, roomId),
          ]);

          if (activeSession) {
            startSessionRef.current(activeSession, room);
          }
        } catch {
          // 세션 로드 실패 무시
        } finally {
          isLoadingRef.current = false;
        }
      }

      // 방 상태가 AVAILABLE로 변경되었을 때 (세션 종료됨)
      if (event.status === STORE_ROOM_STATUS.AVAILABLE) {
        endSessionRef.current();
      }
    },
    [storeId, roomId]
  );

  // SSE 연결
  useRoomStatusSse({
    storeId,
    roomId,
    onRoomStatusChanged: handleRoomStatusChanged,
    enabled: true,
  });

  return <>{children}</>;
}
