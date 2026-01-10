import { cn } from '@repo/ui';
import type { ActiveRoom } from '@/types/pos';

interface Props {
  room: ActiveRoom;
  isSelected: boolean;
  onClick: () => void;
}

export function RoomSelectCard({ room, isSelected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full rounded-lg border p-3 text-left transition-all',
        isSelected ? 'border-primary bg-primary/10' : 'hover:border-primary/50'
      )}
    >
      <div className="text-lg font-bold">{room.roomNumber}번방</div>
      {room.pendingOrderCount > 0 && (
        <div className="mt-1 text-xs text-muted-foreground">({room.pendingOrderCount})</div>
      )}
    </button>
  );
}
