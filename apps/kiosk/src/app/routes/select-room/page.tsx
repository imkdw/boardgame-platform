import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Badge, cn } from '@repo/ui';
import { Users, Loader2, Star, Grid3X3, List } from 'lucide-react';
import { KioskLayout } from '../../../components/KioskLayout';
import { BackButton } from '../../../components/BackButton';
import { RoomCard } from '../../../components/RoomCard';
import { RoomCardCompact } from '../../../components/RoomCardCompact';
import { useKioskSession } from '../../../hooks/useKioskSession';
import { useIdleTimer } from '../../../hooks/useIdleTimer';
import { useRooms } from '../../../hooks/useRooms';
import { getRecommendedRooms, getOtherRooms, getOccupiedRooms } from '../../../lib/mock-data';
import { useState, useMemo } from 'react';
import type { Room } from '../../../types/kiosk';

type TabType = 'recommended' | 'available' | 'occupied';
type ViewMode = 'grid' | 'list';

export default function SelectRoomPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { storeId, peopleCount, selectedRoom, setRoom, reset } = useKioskSession();
  const { rooms, isLoading, error, refetch } = useRooms(storeId);
  const [tempSelected, setTempSelected] = useState<Room | null>(selectedRoom);
  const [activeTab, setActiveTab] = useState<TabType>('recommended');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const { showWarning, dismissWarning, handleIdle } = useIdleTimer({
    timeout: 30000,
    redirectTo: '/',
    onIdle: reset,
  });

  const recommendedRooms = useMemo(() => getRecommendedRooms(rooms, peopleCount), [rooms, peopleCount]);
  const otherRooms = useMemo(() => getOtherRooms(rooms, peopleCount), [rooms, peopleCount]);
  const occupiedRooms = useMemo(() => getOccupiedRooms(rooms), [rooms]);
  const allAvailableRooms = useMemo(
    () => [...recommendedRooms, ...otherRooms].sort((a, b) => a.number - b.number),
    [recommendedRooms, otherRooms]
  );
  const recommendedRoomIds = useMemo(() => new Set(recommendedRooms.map(r => r.id)), [recommendedRooms]);

  const handleRoomSelect = (room: Room) => {
    setTempSelected(room);
  };

  const handleConfirm = () => {
    if (tempSelected) {
      setRoom(tempSelected);
      navigate('/select-time');
    }
  };

  const tabs: { key: TabType; label: string; count: number; icon?: React.ReactNode }[] = [
    {
      key: 'recommended',
      label: t('selectRoom.recommended'),
      count: recommendedRooms.length,
      icon: <Star className="size-4" />,
    },
    { key: 'available', label: t('selectRoom.allAvailable'), count: allAvailableRooms.length },
    { key: 'occupied', label: t('selectRoom.occupied'), count: occupiedRooms.length },
  ];

  const currentRooms = useMemo(() => {
    switch (activeTab) {
      case 'recommended':
        return recommendedRooms;
      case 'available':
        return allAvailableRooms;
      case 'occupied':
        return occupiedRooms;
      default:
        return [];
    }
  }, [activeTab, recommendedRooms, allAvailableRooms, occupiedRooms]);

  const renderRoomGrid = () => (
    <div className="grid grid-cols-4 gap-4">
      {currentRooms.map(room => (
        <RoomCardCompact
          key={room.id}
          room={room}
          isSelected={tempSelected?.id === room.id}
          isRecommended={activeTab === 'available' && recommendedRoomIds.has(room.id)}
          onClick={() => handleRoomSelect(room)}
          disabled={room.status === 'occupied'}
        />
      ))}
    </div>
  );

  const renderRoomList = () => (
    <div className="space-y-3">
      {currentRooms.map(room => (
        <RoomCard
          key={room.id}
          room={room}
          isSelected={tempSelected?.id === room.id}
          isRecommended={activeTab !== 'occupied' && recommendedRoomIds.has(room.id)}
          onClick={() => handleRoomSelect(room)}
          disabled={room.status === 'occupied'}
        />
      ))}
    </div>
  );

  return (
    <KioskLayout>
      <div className="flex items-center justify-between p-8">
        <BackButton to="/select-people" />
        <div className="text-lg text-muted-foreground">{t('common.step', { current: 2, total: 4 })}</div>
      </div>

      <div className="px-12 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-2 px-4 py-2 text-lg">
              <Users className="size-5" />
              {t('common.peopleCount', { count: peopleCount })}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => navigate('/select-people')}>
              {t('common.change')}
            </Button>
          </div>

          <div className="flex items-center gap-2" role="group" aria-label={t('selectRoom.viewMode')}>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="size-10"
              aria-label={t('selectRoom.gridView')}
              aria-pressed={viewMode === 'grid'}
            >
              <Grid3X3 className="size-5" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
              className="size-10"
              aria-label={t('selectRoom.listView')}
              aria-pressed={viewMode === 'list'}
            >
              <List className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-12 pb-4">
        <h2 className="mb-2 text-3xl font-bold">{t('selectRoom.title')}</h2>
        <p className="text-lg text-muted-foreground">{t('selectRoom.subtitle')}</p>
      </div>

      <div className="flex gap-2 px-12 pb-4">
        {tabs.map(tab => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? 'default' : 'outline'}
            size="touch"
            onClick={() => setActiveTab(tab.key)}
            className={cn('gap-2', activeTab === tab.key && 'ring-2 ring-offset-2')}
          >
            {tab.icon}
            {tab.label}
            <Badge variant={activeTab === tab.key ? 'secondary' : 'outline'} className="ml-1">
              {tab.count}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-12 pb-8">
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
            {currentRooms.length > 0 ? (
              viewMode === 'grid' ? (
                renderRoomGrid()
              ) : (
                renderRoomList()
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-lg text-muted-foreground">
                  {activeTab === 'recommended'
                    ? t('selectRoom.noRecommended')
                    : activeTab === 'occupied'
                      ? t('selectRoom.noOccupied')
                      : t('selectRoom.noRooms')}
                </p>
                {activeTab === 'recommended' && allAvailableRooms.length > 0 && (
                  <Button variant="outline" size="touch" className="mt-4" onClick={() => setActiveTab('available')}>
                    {t('selectRoom.viewAllAvailable')}
                  </Button>
                )}
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
