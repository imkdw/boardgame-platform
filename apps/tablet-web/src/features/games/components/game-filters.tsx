'use client';

import { useTranslations } from 'next-intl';
import { RotateCcw } from 'lucide-react';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Label,
} from '@repo/ui';
import type { GameFiltersState, GameGenre, GameDifficulty, PlayerCount, PlayTimeRange } from '../types';
import { DEFAULT_FILTERS } from '../types';

const PLAYER_COUNTS: PlayerCount[] = ['2', '3', '4', '5+'];
const GENRES: GameGenre[] = ['전략', '파티', '추리', '협동', '블러핑', '순발력', '단어', '팀전'];
const DIFFICULTIES: GameDifficulty[] = ['easy', 'medium', 'hard'];
const PLAY_TIME_RANGES: PlayTimeRange[] = ['30', '60', '60+'];

interface Props {
  filters: GameFiltersState;
  onFiltersChange: (filters: GameFiltersState) => void;
}

export function GameFilters({ filters, onFiltersChange }: Props) {
  const t = useTranslations('GameSearch.filter');

  const hasActiveFilters =
    filters.playerCount !== null ||
    filters.genres.length > 0 ||
    filters.difficulty !== null ||
    filters.playTimeRange !== null ||
    filters.availableOnly ||
    filters.recommendedOnly;

  const handleReset = () => {
    onFiltersChange(DEFAULT_FILTERS);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Player Count */}
      <Select
        value={filters.playerCount ?? 'all'}
        onValueChange={value =>
          onFiltersChange({ ...filters, playerCount: value === 'all' ? null : (value as PlayerCount) })
        }
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder={t('groupLabel.players')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('all')}</SelectItem>
          {PLAYER_COUNTS.map(count => (
            <SelectItem key={count} value={count}>
              {t(`players.${count}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Genre */}
      <Select
        value={filters.genres[0] ?? 'all'}
        onValueChange={value =>
          onFiltersChange({ ...filters, genres: value === 'all' ? [] : [value as GameGenre] })
        }
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder={t('groupLabel.genre')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('all')}</SelectItem>
          {GENRES.map(genre => (
            <SelectItem key={genre} value={genre}>
              {t(`genres.${genre}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Difficulty */}
      <Select
        value={filters.difficulty ?? 'all'}
        onValueChange={value =>
          onFiltersChange({ ...filters, difficulty: value === 'all' ? null : (value as GameDifficulty) })
        }
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder={t('groupLabel.difficulty')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('all')}</SelectItem>
          {DIFFICULTIES.map(difficulty => (
            <SelectItem key={difficulty} value={difficulty}>
              {t(`difficulty.${difficulty}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Play Time */}
      <Select
        value={filters.playTimeRange ?? 'all'}
        onValueChange={value =>
          onFiltersChange({ ...filters, playTimeRange: value === 'all' ? null : (value as PlayTimeRange) })
        }
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder={t('groupLabel.playTime')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('all')}</SelectItem>
          {PLAY_TIME_RANGES.map(time => (
            <SelectItem key={time} value={time}>
              {t(`playTime.${time}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Divider */}
      <div className="h-8 w-px bg-border" />

      {/* Available Only */}
      <div className="flex items-center gap-2">
        <Switch
          id="available-only"
          checked={filters.availableOnly}
          onCheckedChange={checked => onFiltersChange({ ...filters, availableOnly: checked })}
        />
        <Label htmlFor="available-only" className="text-sm">
          {t('availableOnly')}
        </Label>
      </div>

      {/* Recommended Only */}
      <div className="flex items-center gap-2">
        <Switch
          id="recommended-only"
          checked={filters.recommendedOnly}
          onCheckedChange={checked => onFiltersChange({ ...filters, recommendedOnly: checked })}
        />
        <Label htmlFor="recommended-only" className="text-sm">
          {t('recommendedOnly')}
        </Label>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5">
          <RotateCcw className="h-4 w-4" />
          {t('reset')}
        </Button>
      )}
    </div>
  );
}
