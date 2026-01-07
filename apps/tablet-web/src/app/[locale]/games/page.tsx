'use client';

import type { ReactNode } from 'react';
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@repo/ui';

import { TabletHeader } from '@/components/layout';
import { LocaleSwitcher } from '@/components/shared';
import { GameSearchBar, GameList, mockGames, type GameSortBy, type Game } from '@/features/games';
import { Link } from '@/i18n/navigation';

const DIFFICULTY_ORDER: Record<Game['difficulty'], number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export default function GamesPage(): ReactNode {
  const t = useTranslations('TabletHome');
  const tGame = useTranslations('GameSearch');

  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<GameSortBy>('recommended');

  const handleSearch = () => {
    setSearchQuery(inputValue);
  };

  const filteredGames = useMemo(() => {
    const filtered = mockGames.filter(game => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return game.name.toLowerCase().includes(query) || game.nameEn.toLowerCase().includes(query);
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recommended':
          if (a.isRecommended !== b.isRecommended) {
            return a.isRecommended ? -1 : 1;
          }
          return a.name.localeCompare(b.name, 'ko');

        case 'popular': {
          // Mock: 재고가 적을수록 인기가 많다고 가정
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
  }, [searchQuery, sortBy]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TabletHeader
        storeName={t('header.storeName')}
        tableLabel={t('header.tableLabel')}
        tableNumber={t('tableInfo.tableNumber')}
        languageSwitcher={<LocaleSwitcher />}
      />

      <main className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">{tGame('pageTitle')}</h1>
        </div>

        <GameSearchBar
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSearch={handleSearch}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultCount={filteredGames.length}
        />

        <GameList games={filteredGames} />
      </main>
    </div>
  );
}
