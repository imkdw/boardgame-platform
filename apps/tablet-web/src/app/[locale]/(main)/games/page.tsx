'use client';

import type { ReactNode } from 'react';
import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';

import {
  GameSearchBar,
  GameList,
  GameEmptyState,
  mockGames,
  type GameSortBy,
  type Game,
  type GameFiltersState,
  DEFAULT_FILTERS,
} from '@/features/games';

const DIFFICULTY_ORDER: Record<Game['difficulty'], number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

function matchesPlayerCount(game: Game, playerCount: GameFiltersState['playerCount']): boolean {
  if (!playerCount) return true;

  switch (playerCount) {
    case '2':
      return game.minPlayers <= 2 && game.maxPlayers >= 2;
    case '3':
      return game.minPlayers <= 3 && game.maxPlayers >= 3;
    case '4':
      return game.minPlayers <= 4 && game.maxPlayers >= 4;
    case '5+':
      return game.maxPlayers >= 5;
    default:
      return true;
  }
}

function matchesPlayTime(game: Game, playTimeRange: GameFiltersState['playTimeRange']): boolean {
  if (!playTimeRange) return true;

  switch (playTimeRange) {
    case '30':
      return game.playTime <= 30;
    case '60':
      return game.playTime > 30 && game.playTime <= 60;
    case '60+':
      return game.playTime > 60;
    default:
      return true;
  }
}

function matchesGenres(game: Game, genres: GameFiltersState['genres']): boolean {
  if (genres.length === 0) return true;
  return genres.some(genre => game.genres.includes(genre));
}

export default function GamesPage(): ReactNode {
  const tGame = useTranslations('GameSearch');

  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<GameSortBy>('recommended');
  const [filters, setFilters] = useState<GameFiltersState>(DEFAULT_FILTERS);

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

  const filteredGames = useMemo(() => {
    const filtered = mockGames.filter(game => {
      // Text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = game.name.toLowerCase().includes(query) || game.nameEn.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Player count filter
      if (!matchesPlayerCount(game, filters.playerCount)) return false;

      // Genre filter
      if (!matchesGenres(game, filters.genres)) return false;

      // Difficulty filter
      if (filters.difficulty && game.difficulty !== filters.difficulty) return false;

      // Play time filter
      if (!matchesPlayTime(game, filters.playTimeRange)) return false;

      // Available only filter
      if (filters.availableOnly && !game.isAvailable) return false;

      // Recommended only filter
      if (filters.recommendedOnly && !game.isRecommended) return false;

      return true;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recommended':
          if (a.isRecommended !== b.isRecommended) {
            return a.isRecommended ? -1 : 1;
          }
          return a.name.localeCompare(b.name, 'ko');

        case 'popular': {
          const aPopularity = a.stock - a.availableStock;
          const bPopularity = b.stock - b.availableStock;
          if (aPopularity !== bPopularity) {
            return bPopularity - aPopularity;
          }
          return a.name.localeCompare(b.name, 'ko');
        }

        case 'name':
          return a.name.localeCompare(b.name, 'ko');

        case 'difficulty':
          return DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];

        default:
          return 0;
      }
    });
  }, [searchQuery, sortBy, filters]);

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
        resultCount={filteredGames.length}
      />
      {filteredGames.length > 0 ? (
        <GameList games={filteredGames} />
      ) : (
        <GameEmptyState hasActiveFilters={hasActiveFilters} onResetFilters={handleResetFilters} />
      )}
    </div>
  );
}
