'use client';

import type { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui';
import { DoorOpen, Users } from 'lucide-react';
import type { StoreRoom } from '@repo/types';
import { EditStoreRoomDialog } from './edit-store-room-dialog';
import { DeleteStoreRoomDialog } from './delete-store-room-dialog';

interface Props {
  storeId: string;
  rooms: StoreRoom[];
  onRefresh: () => void;
}

const STATUS_LABELS: Record<string, string> = {
  AVAILABLE: '이용 가능',
  IN_USE: '사용 중',
  RESERVED: '예약됨',
  MAINTENANCE: '점검 중',
};

const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: 'bg-green-500',
  IN_USE: 'bg-blue-500',
  RESERVED: 'bg-yellow-500',
  MAINTENANCE: 'bg-red-500',
};

export function StoreRoomTable({ storeId, rooms, onRefresh }: Props): ReactNode {
  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <DoorOpen className="mb-4 size-12" />
        <p>등록된 방이 없습니다.</p>
        <p className="text-sm">새 방을 추가해주세요.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>방 번호</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>수용 인원</TableHead>
          <TableHead>설명</TableHead>
          <TableHead className="w-24 text-center">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.map(room => (
          <TableRow key={room.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                  <DoorOpen className="size-4 text-primary" />
                </div>
                <span className="font-medium">{room.roomNumber}호</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className={`size-2 rounded-full ${STATUS_COLORS[room.status] ?? 'bg-gray-500'}`} />
                <span className="text-sm">{STATUS_LABELS[room.status] ?? room.status}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="size-4 shrink-0" />
                <span className="text-sm">
                  {room.minCapacity} ~ {room.maxCapacity}명
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span className="line-clamp-2 max-w-xs text-sm text-muted-foreground">{room.description}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-1">
                <EditStoreRoomDialog storeId={storeId} room={room} onSuccess={onRefresh} />
                <DeleteStoreRoomDialog storeId={storeId} room={room} onSuccess={onRefresh} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
