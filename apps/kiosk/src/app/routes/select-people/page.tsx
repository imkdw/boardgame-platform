import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { KioskLayout } from '../../../components/KioskLayout';
import { BackButton } from '../../../components/BackButton';
import { PeopleCountButton } from '../../../components/PeopleCountButton';
import { useKioskSession } from '../../../hooks/useKioskSession';
import { useIdleTimer } from '../../../hooks/useIdleTimer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button } from '@repo/ui';

const PEOPLE_OPTIONS = [2, 3, 4, 5, 6, 7, '8+'];

export default function SelectPeoplePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { peopleCount, setPeopleCount, reset } = useKioskSession();
  const { showWarning, dismissWarning, handleIdle } = useIdleTimer({
    timeout: 30000,
    redirectTo: '/',
    onIdle: reset,
  });

  const handleSelect = (count: number | string) => {
    const numCount = typeof count === 'string' ? 8 : count;
    setPeopleCount(numCount);
    navigate('/select-room');
  };

  return (
    <KioskLayout>
      <div className="flex items-center justify-between p-8">
        <BackButton to="/" onClick={reset} />
        <div className="text-lg text-muted-foreground">{t('common.step', { current: 1, total: 4 })}</div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-12">
        <h1 className="mb-4 text-4xl font-bold">{t('selectPeople.title')}</h1>
        <p className="mb-16 text-xl text-muted-foreground">{t('selectPeople.subtitle')}</p>

        <div className="grid grid-cols-4 gap-6">
          {PEOPLE_OPTIONS.map(count => (
            <PeopleCountButton
              key={count}
              count={count}
              isSelected={typeof count === 'number' ? peopleCount === count : peopleCount >= 8}
              onClick={() => handleSelect(count)}
            />
          ))}
        </div>
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
