import type { ActiveRoom } from '@/types/pos';
import { RoomSelectCard } from './room-select-card';
import { SectionHeader } from '@/components/shared/section-header';

interface Props {
  rooms: ActiveRoom[];
  selectedRoom: ActiveRoom | null;
  onSelectRoom: (room: ActiveRoom | null) => void;
}

export function RoomSelector({ rooms, selectedRoom, onSelectRoom }: Props) {
  return (
    <div className="space-y-3">
      <SectionHeader title="룸 선택" />
      {rooms.length === 0 ? (
        <p className="text-sm text-muted-foreground">사용중인 룸이 없습니다</p>
      ) : (
        <div className="space-y-2">
          {rooms.map((room) => (
            <RoomSelectCard
              key={room.id}
              room={room}
              isSelected={selectedRoom?.id === room.id}
              onClick={() => onSelectRoom(selectedRoom?.id === room.id ? null : room)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
