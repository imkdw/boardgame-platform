'use client';

import type { ReactNode } from 'react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { GameList, type GameCardItem } from '@repo/ui';
import { GameSearchBar, GameEmptyState } from '@/features/games/components';
import { type GameSortBy, type Game, type GameFiltersState, DEFAULT_FILTERS } from '@/features/games/types';
import { getStoreGames } from '@/lib/games-api';

function convertToCardItem(game: Game): GameCardItem {
  return {
    id: game.id,
    name: game.name,
    thumbnail: game.thumbnail,
    minPlayers: game.minPlayers,
    maxPlayers: game.maxPlayers,
    playTime: game.playTime,
    difficulty: game.difficulty,
    genres: game.genres,
    isAvailable: game.isAvailable,
    isRecommended: game.isRecommended,
    stock: game.stock,
    availableStock: game.availableStock,
  };
}

interface Props {
  storeId: string;
  initialGames: Game[];
}

export function GamesPageContent({ storeId, initialGames }: Props): ReactNode {
  const router = useRouter();
  const tGame = useTranslations('GameSearch');
  const tCard = useTranslations('GameSearch.card');

  const [games, setGames] = useState<Game[]>(initialGames);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<GameSortBy>('recommended');
  const [filters, setFilters] = useState<GameFiltersState>(DEFAULT_FILTERS);

  const fetchGames = useCallback(async () => {
    const result = await getStoreGames(storeId, {
      search: searchQuery || undefined,
      filters,
      sortBy,
    });
    setGames(result);
  }, [storeId, searchQuery, filters, sortBy]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const handleSearch = () => setSearchQuery(inputValue);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.playerCount !== null ||
      filters.genres.length > 0 ||
      filters.difficulty !== null ||
      filters.playTimeRange !== null ||
      filters.availableOnly ||
      filters.recommendedOnly
    );
  }, [filters]);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const gameCardItems = useMemo(() => games.map(convertToCardItem), [games]);

  const handleGameClick = (game: GameCardItem) => {
    router.push(`/games/${game.id}`);
  };

  const labels = {
    recommended: tCard('recommended'),
    available: tCard('available'),
    unavailable: tCard('unavailable'),
    playTime: tCard('playTimeUnit'),
    difficulty: {
      easy: tCard('difficulty.easy'),
      medium: tCard('difficulty.medium'),
      hard: tCard('difficulty.hard'),
    },
  };

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-auto p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">{tGame('pageTitle')}</h1>
      </div>
      <GameSearchBar
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSearch={handleSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
        filters={filters}
        onFiltersChange={setFilters}
        resultCount={games.length}
      />
      {games.length > 0 ? (
        <GameList games={gameCardItems} onClick={handleGameClick} labels={labels} />
      ) : (
        <GameEmptyState hasActiveFilters={hasActiveFilters} onResetFilters={handleResetFilters} />
      )}
    </div>
  );
}
