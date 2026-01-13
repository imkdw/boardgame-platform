import { useState, useEffect, useCallback } from 'react';
import type { ApiResponse } from '@repo/types';
import { STORE_ROOM_STATUS } from '@repo/consts';
import { fetchApi } from '../lib/api';
import type { Room, RoomStatus } from '../types/kiosk';

interface StoreRoomDto {
  id: string;
  storeId: string;
  roomNumber: number;
  status: string;
  minCapacity: number;
  maxCapacity: number;
  description: string;
}

function mapStatus(apiStatus: string): RoomStatus {
  if (apiStatus === STORE_ROOM_STATUS.AVAILABLE) {
    return 'available';
  }
  return 'occupied';
}

function storeRoomToRoom(dto: StoreRoomDto): Room {
  return {
    id: dto.id,
    number: dto.roomNumber,
    name: '', // Name is generated via i18n in the component
    minCapacity: dto.minCapacity,
    maxCapacity: dto.maxCapacity,
    status: mapStatus(dto.status),
    description: dto.description || undefined,
  };
}

interface UseRoomsResult {
  rooms: Room[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useRooms(storeId: string | null): UseRoomsResult {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRooms = useCallback(async () => {
    if (!storeId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetchApi<ApiResponse<StoreRoomDto[]>>(`/stores/${storeId}/rooms`);
      const mappedRooms = response.data.map(storeRoomToRoom);
      setRooms(mappedRooms);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch rooms'));
      setRooms([]);
    } finally {
      setIsLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return { rooms, isLoading, error, refetch: fetchRooms };
}
