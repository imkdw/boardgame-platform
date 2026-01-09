import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button, Card } from '@repo/ui';
import { CheckCircle, Clock, DoorOpen } from 'lucide-react';
import { KioskLayout } from '../../../components/KioskLayout';
import { CountdownTimer } from '../../../components/CountdownTimer';
import { useKioskSession } from '../../../hooks/useKioskSession';

export default function CompletePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { selectedRoom, selectedTimePackage, endTime, reset } = useKioskSession();

  const handleComplete = () => {
    reset();
    navigate('/');
  };

  if (!selectedRoom || !selectedTimePackage) {
    navigate('/');
    return null;
  }

  const formatTime = (date: Date | null) => {
    if (!date) return t('complete.unlimited');
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <KioskLayout>
      <div className="flex flex-1 flex-col items-center justify-center px-12">
        <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-status-complete/20">
          <CheckCircle className="size-16 text-status-complete" />
        </div>

        <h1 className="mb-4 text-4xl font-bold">{t('complete.title')}</h1>
        <p className="mb-12 text-xl text-muted-foreground">{t('complete.subtitle')}</p>

        <Card className="w-full max-w-md p-8">
          <div className="flex flex-col items-center gap-8">
            <div className="flex size-32 items-center justify-center rounded-2xl bg-primary text-white">
              <div className="text-center">
                <DoorOpen className="mx-auto mb-2 size-10" />
                <span className="text-5xl font-bold">{selectedRoom.number}</span>
              </div>
            </div>

            <div className="w-full space-y-4 text-center">
              <div className="flex items-center justify-between px-4">
                <span className="text-lg text-muted-foreground">{t('complete.duration')}</span>
                <span className="text-xl font-semibold">{selectedTimePackage.label}</span>
              </div>

              <div className="flex items-center justify-between px-4">
                <span className="text-lg text-muted-foreground">{t('complete.endTime')}</span>
                <span className="flex items-center gap-2 text-xl font-semibold">
                  <Clock className="size-5" />
                  {formatTime(endTime)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <p className="mb-4 text-2xl font-semibold text-primary">
            {t('complete.goToRoom', { number: selectedRoom.number })}
          </p>
          <p className="text-lg text-muted-foreground">{t('complete.tabletHint')}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pb-12">
        <CountdownTimer seconds={5} redirectTo="/" onComplete={reset} />
        <Button variant="ghost" size="touch" onClick={handleComplete}>
          {t('complete.returnNow')}
        </Button>
      </div>
    </KioskLayout>
  );
}
