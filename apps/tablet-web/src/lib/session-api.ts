import type { ApiResponse, RoomSession, StoreRoom } from '@repo/types';
import { fetchApi } from './api';

export interface CreateSessionDto {
  timePlanId: string;
  peopleCount: number;
}

/**
 * 활성 세션 조회
 */
export async function getActiveSession(storeId: string, roomId: string): Promise<RoomSession | null> {
  try {
    const response = await fetchApi<ApiResponse<RoomSession>>(
      `/stores/${storeId}/rooms/${roomId}/sessions/active`
    );
    return response.data;
  } catch {
    // 404 등의 경우 null 반환
    return null;
  }
}

/**
 * 세션 종료 요청
 */
export async function endSession(storeId: string, roomId: string, sessionId: string): Promise<RoomSession> {
  const response = await fetchApi<ApiResponse<RoomSession>>(
    `/stores/${storeId}/rooms/${roomId}/sessions/${sessionId}/end`,
    {
      method: 'POST',
    }
  );
  return response.data;
}

/**
 * 방 정보 조회
 */
export async function getRoomById(storeId: string, roomId: string): Promise<StoreRoom> {
  const response = await fetchApi<ApiResponse<StoreRoom>>(`/stores/${storeId}/rooms/${roomId}`);
  return response.data;
}

/**
 * 특정 매장의 모든 방 조회
 */
export async function getRooms(storeId: string): Promise<StoreRoom[]> {
  const response = await fetchApi<ApiResponse<StoreRoom[]>>(`/stores/${storeId}/rooms`);
  return response.data;
}
