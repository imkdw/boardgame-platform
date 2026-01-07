import { useTranslations } from 'next-intl';
import { Dices } from 'lucide-react';

export function GameEmptyState() {
  const t = useTranslations('GameSearch.empty');

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Dices className="mb-4 h-16 w-16 text-muted-foreground" />
      <h3 className="mb-2 text-xl font-semibold text-foreground">{t('title')}</h3>
      <p className="text-muted-foreground">{t('description')}</p>
    </div>
  );
}
