import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, Separator } from '@repo/ui';
import { useNavigate } from 'react-router';
import type { ActiveRoom } from '@/types/pos';
import { formatElapsedTimeFull, formatRemainingTime, formatTimeShort, isExpiringSoon } from '@/lib/format';
import { getRoomStatusLabel } from '@/hooks/use-rooms';
import { useRealTime } from '@/hooks/use-real-time';

interface Props {
  room: ActiveRoom | null;
  onClose: () => void;
}

export function RoomDetailPanel({ room, onClose }: Props) {
  const navigate = useNavigate();
  const currentTime = useRealTime();

  if (!room) return null;

  const isExpiring = room.status === 'IN_USE' && isExpiringSoon(room.endTime, 30);
  const statusLabel = getRoomStatusLabel(room.status);

  const handleOrderClick = () => {
    navigate('/orders');
    onClose();
  };

  const handleGameRentalClick = () => {
    navigate('/games/rental');
    onClose();
  };

  return (
    <Sheet open={!!room} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-[400px] px-6 py-6">
        <SheetHeader className="pb-4">
          <SheetTitle>{room.roomNumber}번방 상세</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">상태</span>
              <span className={isExpiring ? 'font-bold text-red-500' : ''}>
                {statusLabel} {isExpiring && '(만료 임박!)'}
              </span>
            </div>

            {room.status === 'IN_USE' && room.checkInTime && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">입실</span>
                  <span>{formatTimeShort(room.checkInTime)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">경과</span>
                  <span className="font-mono">{formatElapsedTimeFull(room.checkInTime, currentTime)}</span>
                </div>
                {room.endTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">남은 시간</span>
                    <span className={isExpiring ? 'font-mono font-bold text-red-500' : 'font-mono'}>
                      {formatRemainingTime(room.endTime, currentTime)} {isExpiring && '⚠️'}
                    </span>
                  </div>
                )}
              </>
            )}

            {room.status === 'RESERVED' && room.reservedTime && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">예약 시간</span>
                <span>{formatTimeShort(room.reservedTime)}</span>
              </div>
            )}
          </div>

          {room.rentedGames.length > 0 && (
            <>
              <Separator />
              <div>
                <span className="text-muted-foreground">대여 게임:</span>
                <ul className="mt-2 space-y-1">
                  {room.rentedGames.map((game) => (
                    <li key={game.id} className="text-sm">
                      - {game.gameName}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <Separator />

          <div className="flex gap-2">
            <Button variant="default" className="flex-1" onClick={handleOrderClick}>
              주문하기
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleGameRentalClick}>
              게임대여
            </Button>
            <Button variant="outline" className="flex-1">
              시간연장
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
