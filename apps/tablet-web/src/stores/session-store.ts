import { create } from 'zustand';
import type { RoomSession, StoreRoom } from '@repo/types';

interface SessionState {
  /** 현재 활성 세션 */
  session: RoomSession | null;
  /** 세션이 할당된 방 */
  room: StoreRoom | null;
  /** 세션 활성 여부 */
  isActive: boolean;
  /** 남은 시간 (초) */
  remainingSeconds: number;

  /** 세션 시작 */
  startSession: (session: RoomSession, room: StoreRoom) => void;
  /** 세션 종료 */
  endSession: () => void;
  /** 남은 시간 업데이트 */
  updateRemainingSeconds: (seconds: number) => void;
  /** 남은 시간 감소 (타이머용) */
  decrementRemainingSeconds: () => void;
}

function calculateRemainingSeconds(scheduledEndAt: string): number {
  const end = new Date(scheduledEndAt).getTime();
  const now = Date.now();
  const remaining = Math.max(0, Math.floor((end - now) / 1000));
  return remaining;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  session: null,
  room: null,
  isActive: false,
  remainingSeconds: 0,

  startSession: (session: RoomSession, room: StoreRoom) => {
    const remainingSeconds = calculateRemainingSeconds(session.scheduledEndAt);
    set({
      session,
      room,
      isActive: true,
      remainingSeconds,
    });
  },

  endSession: () => {
    set({
      session: null,
      room: null,
      isActive: false,
      remainingSeconds: 0,
    });
  },

  updateRemainingSeconds: (seconds: number) => {
    set({ remainingSeconds: seconds });
  },

  decrementRemainingSeconds: () => {
    const { remainingSeconds } = get();
    if (remainingSeconds > 0) {
      set({ remainingSeconds: remainingSeconds - 1 });
    }
  },
}));
