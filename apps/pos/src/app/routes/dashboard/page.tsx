import { useState } from 'react';
import { Button } from '@repo/ui';
import { useRooms } from '@/hooks/use-rooms';
import { POSHeader } from '@/components/shared/pos-header';
import { RoomCard } from './components/room-card';
import { RoomDetailPanel } from './components/room-detail-panel';
import type { ActiveRoom } from '@/types/pos';

export default function DashboardPage() {
  const { rooms, counts } = useRooms();
  const [selectedRoom, setSelectedRoom] = useState<ActiveRoom | null>(null);

  return (
    <div className="flex h-full flex-col">
      <POSHeader activeRoomCount={counts.inUse} totalRoomCount={counts.all} />

      {/* 필터 + 액션 바 */}
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            전체 {counts.all}개 · 사용중 {counts.inUse}개 · 비어있음 {counts.available}개
            {counts.expiring > 0 && (
              <span className="ml-2 text-orange-500">· 만료임박 {counts.expiring}개</span>
            )}
          </span>
          <div className="flex items-center gap-3 border-l pl-4">
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded border border-zinc-200 bg-white" />
              <span className="text-xs text-muted-foreground">비어있음</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded bg-zinc-800" />
              <span className="text-xs text-muted-foreground">사용중</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded bg-orange-500" />
              <span className="text-xs text-muted-foreground">만료임박</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded bg-violet-600" />
              <span className="text-xs text-muted-foreground">예약</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded bg-blue-600" />
              <span className="text-xs text-muted-foreground">정비중</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            전체 현황
          </Button>
          <Button variant="default" size="sm">
            새 입실
          </Button>
        </div>
      </div>

      {/* 플로어 플랜 영역 */}
      <div className="relative flex-1 overflow-auto bg-muted/30 p-8">
        <div className="mx-auto grid max-w-[1600px] grid-cols-8 gap-4">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onClick={() => setSelectedRoom(room)} />
          ))}
        </div>
      </div>

      <RoomDetailPanel room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </div>
  );
}
