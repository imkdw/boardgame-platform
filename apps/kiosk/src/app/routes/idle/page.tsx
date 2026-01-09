import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@repo/ui';
import { Hand } from 'lucide-react';
import { KioskLayout } from '../../../components/KioskLayout';
import { LocaleSwitcher } from '../../../components/LocaleSwitcher';
import { useKioskSession } from '../../../hooks/useKioskSession';
import { useEffect } from 'react';

export default function IdlePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { reset } = useKioskSession();

  useEffect(() => {
    reset();
  }, [reset]);

  const handleStart = () => {
    navigate('/select-people');
  };

  return (
    <KioskLayout>
      <div className="absolute left-8 top-8 z-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
          <span className="text-2xl font-bold text-white">B</span>
        </div>
        <span className="text-xl font-semibold text-foreground">{t('idle.storeName')}</span>
      </div>

      <div className="absolute right-8 top-8 z-10">
        <LocaleSwitcher />
      </div>

      <div onClick={handleStart} className="flex flex-1 cursor-pointer flex-col items-center justify-center px-12">
        <h1 className="mb-6 text-5xl font-bold tracking-tight">{t('idle.welcome')}</h1>

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
