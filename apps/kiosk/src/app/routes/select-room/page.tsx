import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Badge } from '@repo/ui';
import { Users, Loader2 } from 'lucide-react';
import { KioskLayout } from '../../../components/KioskLayout';
import { BackButton } from '../../../components/BackButton';
import { RoomCard } from '../../../components/RoomCard';
import { useKioskSession } from '../../../hooks/useKioskSession';
import { useIdleTimer } from '../../../hooks/useIdleTimer';
import { useRooms } from '../../../hooks/useRooms';
import { getRecommendedRooms, getOtherRooms, getOccupiedRooms } from '../../../lib/mock-data';
import { useState } from 'react';
import type { Room } from '../../../types/kiosk';

export default function SelectRoomPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { storeId, peopleCount, selectedRoom, setRoom, reset } = useKioskSession();
  const { rooms, isLoading, error, refetch } = useRooms(storeId);
  const [tempSelected, setTempSelected] = useState<Room | null>(selectedRoom);
  const { showWarning, dismissWarning, handleIdle } = useIdleTimer({
    timeout: 30000,
    redirectTo: '/',
    onIdle: reset,
  });

  const recommendedRooms = getRecommendedRooms(rooms, peopleCount);
  const otherRooms = getOtherRooms(rooms, peopleCount);
  const occupiedRooms = getOccupiedRooms(rooms);

  const handleRoomSelect = (room: Room) => {
    setTempSelected(room);
  };

  const handleConfirm = () => {
    if (tempSelected) {
      setRoom(tempSelected);
      navigate('/select-time');
    }
  };

  return (
    <KioskLayout>
      <div className="flex items-center justify-between p-8">
        <BackButton to="/select-people" />
        <div className="text-lg text-muted-foreground">{t('common.step', { current: 2, total: 4 })}</div>
      </div>

      <div className="px-12 pb-4">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="gap-2 px-4 py-2 text-lg">
            <Users className="size-5" />
            {t('common.peopleCount', { count: peopleCount })}
          </Badge>
          <Button variant="ghost" size="sm" onClick={() => navigate('/select-people')}>
            {t('common.change')}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-12 pb-8">
        <h2 className="mb-2 text-3xl font-bold">{t('selectRoom.title')}</h2>
        <p className="mb-8 text-lg text-muted-foreground">{t('selectRoom.subtitle')}</p>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="size-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">{t('common.loading')}</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-lg text-destructive">{t('common.error')}</p>
            <p className="mt-2 text-muted-foreground">{error.message}</p>
            <Button variant="outline" size="touch" className="mt-4" onClick={refetch}>
              {t('common.retry')}
            </Button>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {recommendedRooms.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold text-primary">{t('selectRoom.recommended')}</h3>
                <div className="space-y-4">
                  {recommendedRooms.map(room => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      isSelected={tempSelected?.id === room.id}
                      isRecommended
                      onClick={() => handleRoomSelect(room)}
                    />
                  ))}
                </div>
              </div>
            )}

            {otherRooms.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-semibold text-muted-foreground">{t('selectRoom.other')}</h3>
                <div className="space-y-4">
                  {otherRooms.map(room => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      isSelected={tempSelected?.id === room.id}
                      onClick={() => handleRoomSelect(room)}
                    />
                  ))}
                </div>
              </div>
            )}

            {occupiedRooms.length > 0 && (
              <div>
                <h3 className="mb-4 text-xl font-semibold text-muted-foreground">{t('selectRoom.occupied')}</h3>
                <div className="space-y-4">
                  {occupiedRooms.map(room => (
                    <RoomCard key={room.id} room={room} disabled />
                  ))}
                </div>
              </div>
            )}

            {rooms.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-lg text-muted-foreground">{t('selectRoom.noRooms')}</p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="border-t bg-card p-8">
        <Button size="touch-lg" className="w-full text-xl" disabled={!tempSelected} onClick={handleConfirm}>
          {tempSelected ? t('selectRoom.confirmRoom', { number: tempSelected.number }) : t('selectRoom.selectPrompt')}
        </Button>
      </div>

      <Dialog open={showWarning}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>{t('idle.warningTitle')}</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">{t('idle.warningMessage')}</p>
          <DialogFooter className="gap-4">
            <Button variant="outline" size="touch" onClick={handleIdle}>
              {t('idle.exit')}
            </Button>
            <Button size="touch" onClick={dismissWarning}>
              {t('idle.continue')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </KioskLayout>
  );
}
