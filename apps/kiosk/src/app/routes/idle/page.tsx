import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@repo/ui';
import { Hand } from 'lucide-react';
import { KioskLayout } from '../../../components/KioskLayout';
import { LocaleSwitcher } from '../../../components/LocaleSwitcher';
import { useKioskSession } from '../../../hooks/useKioskSession';
import { useEffect, useState } from 'react';

export default function IdlePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { reset } = useKioskSession();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    navigate('/select-people');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <KioskLayout>
      <div className="absolute right-8 top-8 z-10">
        <LocaleSwitcher />
      </div>

      <div className="absolute right-8 top-24 text-right">
        <p className="text-4xl font-bold text-foreground">{formatTime(currentTime)}</p>
      </div>

      <div onClick={handleStart} className="flex flex-1 cursor-pointer flex-col items-center justify-center px-12">
        <div className="mb-12 flex size-32 items-center justify-center rounded-3xl bg-primary shadow-lg">
          <span className="text-6xl font-bold text-white">B</span>
        </div>

        <h1 className="mb-4 text-5xl font-bold tracking-tight">{t('idle.welcome')}</h1>
        <p className="mb-16 text-center text-2xl text-muted-foreground">{t('idle.storeName')}</p>

        <div className="flex flex-col items-center gap-6">
          <div className="animate-bounce">
            <Hand className="size-16 text-primary" />
          </div>
          <Button size="touch-lg" className="px-16 text-2xl">
            {t('idle.touchToStart')}
          </Button>
        </div>
      </div>

      <div className="pb-12 text-center text-lg text-muted-foreground">{t('idle.hint')}</div>
    </KioskLayout>
  );
}
