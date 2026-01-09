'use client';

import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { Input, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui';
import type { GameSortBy, GameFiltersState } from '../types';
import { GameFilters } from './game-filters';

interface Props {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
  sortBy: GameSortBy;
  onSortChange: (sort: GameSortBy) => void;
  filters: GameFiltersState;
  onFiltersChange: (filters: GameFiltersState) => void;
  resultCount: number;
}

export function GameSearchBar({
  inputValue,
  onInputChange,
  onSearch,
  sortBy,
  onSortChange,
  filters,
  onFiltersChange,
  resultCount,
}: Props) {
  const t = useTranslations('GameSearch');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={inputValue}
            onChange={e => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('searchPlaceholder')}
            className="h-12 pl-10 text-base"
          />
        </div>
        <Button onClick={onSearch} size="touch" className="px-6">
          {t('searchButton')}
        </Button>
      </div>

      <GameFilters filters={filters} onFiltersChange={onFiltersChange} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t('sort.label')}:</span>
          <Select value={sortBy} onValueChange={value => onSortChange(value as GameSortBy)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">{t('sort.recommended')}</SelectItem>
              <SelectItem value="popular">{t('sort.popular')}</SelectItem>
              <SelectItem value="name">{t('sort.name')}</SelectItem>
              <SelectItem value="difficulty">{t('sort.difficulty')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span className="text-sm text-muted-foreground">{t('resultCount', { count: resultCount })}</span>
      </div>
    </div>
  );
}
