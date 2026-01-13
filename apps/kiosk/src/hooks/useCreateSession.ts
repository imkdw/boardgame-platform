import { useState, useCallback } from 'react';
import type { ApiResponse } from '@repo/types';
import { fetchApi } from '../lib/api';

interface CreateSessionDto {
  timePlanId: string;
  peopleCount: number;
}

interface RoomSession {
  id: string;
  storeId: string;
  roomId: string;
  timePlanId: string;
  peopleCount: number;
  status: string;
  startedAt: string;
  endedAt: string | null;
  scheduledEndAt: string;
  totalPrice: number;
}

interface UseCreateSessionResult {
  createSession: (storeId: string, roomId: string, dto: CreateSessionDto) => Promise<RoomSession>;
  isLoading: boolean;
  error: Error | null;
}

export function useCreateSession(): UseCreateSessionResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createSession = useCallback(async (storeId: string, roomId: string, dto: CreateSessionDto): Promise<RoomSession> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchApi<ApiResponse<RoomSession>>(`/stores/${storeId}/rooms/${roomId}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
      });

      return response.data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create session');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createSession, isLoading, error };
}
