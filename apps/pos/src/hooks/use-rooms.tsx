import { useMemo, useState } from 'react';
import type { ActiveRoom, RoomStatus } from '@/types/pos';
import { generateMockRooms } from '@/lib/mock-data';
import { isExpiringSoon } from '@/lib/format';

export type RoomFilter = 'ALL' | 'IN_USE' | 'AVAILABLE' | 'EXPIRING';

interface UseRoomsReturn {
  rooms: ActiveRoom[];
  filteredRooms: ActiveRoom[];
  filter: RoomFilter;
  setFilter: (filter: RoomFilter) => void;
  counts: {
    all: number;
    inUse: number;
    available: number;
    expiring: number;
  };
  getRoomById: (id: string) => ActiveRoom | undefined;
}

export function useRooms(): UseRoomsReturn {
  const [rooms] = useState<ActiveRoom[]>(() => generateMockRooms());
  const [filter, setFilter] = useState<RoomFilter>('ALL');

  const counts = useMemo(() => {
    const inUse = rooms.filter((r) => r.status === 'IN_USE').length;
    const available = rooms.filter((r) => r.status === 'AVAILABLE').length;
    const expiring = rooms.filter((r) => r.status === 'IN_USE' && isExpiringSoon(r.endTime, 30)).length;

    return {
      all: rooms.length,
      inUse,
      available,
      expiring,
    };
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    switch (filter) {
      case 'IN_USE':
        return rooms.filter((r) => r.status === 'IN_USE');
      case 'AVAILABLE':
        return rooms.filter((r) => r.status === 'AVAILABLE');
      case 'EXPIRING':
        return rooms.filter((r) => r.status === 'IN_USE' && isExpiringSoon(r.endTime, 30));
      default:
        return rooms;
    }
  }, [rooms, filter]);

  const getRoomById = (id: string) => rooms.find((r) => r.id === id);

  return {
    rooms,
    filteredRooms,
    filter,
    setFilter,
    counts,
    getRoomById,
  };
}

export function getRoomStatusColor(status: RoomStatus, isExpiring = false): string {
  if (status === 'IN_USE' && isExpiring) {
    return 'bg-red-500';
  }

  switch (status) {
    case 'IN_USE':
      return 'bg-green-500';
    case 'AVAILABLE':
      return 'bg-gray-400';
    case 'RESERVED':
      return 'bg-yellow-500';
    case 'MAINTENANCE':
      return 'bg-blue-500';
    default:
      return 'bg-gray-400';
  }
}

export function getRoomStatusLabel(status: RoomStatus): string {
  switch (status) {
    case 'IN_USE':
      return '사용중';
    case 'AVAILABLE':
      return '비어있음';
    case 'RESERVED':
      return '예약됨';
    case 'MAINTENANCE':
      return '정비중';
    default:
      return '알 수 없음';
  }
}
