'use client';

import { useTranslations } from 'next-intl';
import { Dices } from 'lucide-react';
import { Button } from '@repo/ui';

interface Props {
  hasActiveFilters?: boolean;
  onResetFilters?: () => void;
}

export function GameEmptyState({ hasActiveFilters = false, onResetFilters }: Props) {
  const t = useTranslations('GameSearch.empty');

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Dices className="mb-4 h-16 w-16 text-muted-foreground" />
      <h3 className="mb-2 text-xl font-semibold text-foreground">{t('title')}</h3>
      <p className="mb-4 text-muted-foreground">
        {hasActiveFilters ? t('filterSuggestion') : t('description')}
      </p>
      {hasActiveFilters && onResetFilters && (
        <Button variant="outline" onClick={onResetFilters}>
          {t('resetFilters')}
        </Button>
      )}
    </div>
  );
}
