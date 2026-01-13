import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Badge } from '@repo/ui';
import { Users, DoorOpen, Loader2 } from 'lucide-react';
import { KioskLayout } from '../../../components/KioskLayout';
import { BackButton } from '../../../components/BackButton';
import { TimePackageCard } from '../../../components/TimePackageCard';
import { useKioskSession } from '../../../hooks/useKioskSession';
import { useIdleTimer } from '../../../hooks/useIdleTimer';
import { useTimePlans } from '../../../hooks/useTimePlans';
import { MOCK_TIME_PACKAGES } from '../../../lib/mock-data';
import { useState } from 'react';
import type { TimePackage } from '../../../types/kiosk';

export default function SelectTimePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { storeId, peopleCount, selectedRoom, selectedTimePackage, setTimePackage, reset } = useKioskSession();
  const [tempSelected, setTempSelected] = useState<TimePackage | null>(selectedTimePackage);
  const { timePlans, isLoading: isLoadingTimePlans } = useTimePlans(storeId);
  const { showWarning, dismissWarning, handleIdle } = useIdleTimer({
    timeout: 30000,
    redirectTo: '/',
    onIdle: reset,
  });

  // API에서 가져온 데이터가 없으면 mock 데이터 사용
  const timePackages = timePlans.length > 0 ? timePlans : MOCK_TIME_PACKAGES;

  const handleTimeSelect = (pkg: TimePackage) => {
    setTempSelected(pkg);
  };

  const handleConfirm = () => {
    if (tempSelected) {
      setTimePackage(tempSelected);
      navigate('/payment');
    }
  };

  if (!selectedRoom) {
    navigate('/select-room');
    return null;
  }

  return (
    <KioskLayout>
      <div className="flex items-center justify-between p-8">
        <BackButton to="/select-room" />
        <div className="text-lg text-muted-foreground">{t('common.step', { current: 3, total: 4 })}</div>
      </div>

      <div className="flex gap-4 px-12 pb-4">
        <Badge variant="outline" className="gap-2 px-4 py-2 text-lg">
          <DoorOpen className="size-5" />
          {selectedRoom.number}번 방
        </Badge>
        <Badge variant="outline" className="gap-2 px-4 py-2 text-lg">
          <Users className="size-5" />
          {peopleCount}명
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto px-12 pb-8">
        <h2 className="mb-2 text-3xl font-bold">{t('selectTime.title')}</h2>
        <p className="mb-8 text-lg text-muted-foreground">{t('selectTime.subtitle')}</p>

        <div className="space-y-4">
          {isLoadingTimePlans ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            timePackages.map(pkg => (
              <TimePackageCard
                key={pkg.id}
                pkg={pkg}
                isSelected={tempSelected?.id === pkg.id}
                onClick={() => handleTimeSelect(pkg)}
              />
            ))
          )}
        </div>

        <p className="mt-8 text-center text-lg text-muted-foreground">{t('selectTime.hint')}</p>
      </div>

      <div className="border-t bg-card p-8">
        <Button size="touch-lg" className="w-full text-xl" disabled={!tempSelected} onClick={handleConfirm}>
          {tempSelected ? t('selectTime.confirm', { time: tempSelected.label }) : t('selectTime.selectPrompt')}
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
