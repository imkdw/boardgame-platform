import { cn } from '@repo/ui';
import type { ActiveRoom } from '@/types/pos';
import { formatElapsedTime, formatTimeShort, isExpiringSoon } from '@/lib/format';
import { useRealTime } from '@/hooks/use-real-time';

interface Props {
  room: ActiveRoom;
  onClick: () => void;
}

export function RoomCard({ room, onClick }: Props) {
  const currentTime = useRealTime();
  const isExpiring = room.status === 'IN_USE' && isExpiringSoon(room.endTime, 30);

  const getStatusStyles = () => {
    if (room.status === 'IN_USE') {
      if (isExpiring) {
        return 'bg-orange-500 text-white';
      }
      return 'bg-zinc-800 text-white';
    }
    if (room.status === 'RESERVED') {
      return 'bg-violet-600 text-white';
    }
    if (room.status === 'MAINTENANCE') {
      return 'bg-blue-600 text-white';
    }
    // AVAILABLE
    return 'bg-white text-zinc-800 border border-zinc-200';
  };

  const getDisplayTime = () => {
    if (room.status === 'IN_USE' && room.checkInTime) {
      return formatElapsedTime(room.checkInTime, currentTime);
    }
    if (room.status === 'RESERVED' && room.reservedTime) {
      return formatTimeShort(room.reservedTime);
    }
    return null;
  };

  const displayTime = getDisplayTime();

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-24 flex-col items-center justify-center rounded-xl p-3 transition-all',
        'hover:scale-105 hover:shadow-lg active:scale-100',
        getStatusStyles()
      )}
    >
      <span className="text-lg font-bold">{room.roomNumber}번방</span>
      {displayTime && <span className="mt-1 text-sm opacity-80">{displayTime}</span>}
    </button>
  );
}
