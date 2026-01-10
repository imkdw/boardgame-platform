import { useMemo } from 'react';
import { GameList, type GameCardItem } from '@repo/ui';
import { useGameRentals } from '@/hooks/use-game-rentals';
import { FilterPanel } from './components/filter-panel';
import type { GameDifficulty } from '@repo/types';

function convertDifficulty(difficulty: 1 | 2 | 3): GameDifficulty {
  switch (difficulty) {
    case 1:
      return 'easy';
    case 2:
      return 'medium';
    case 3:
      return 'hard';
  }
}

export default function RentalPage() {
  const {
    filteredGamesWithStock,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    rentGame,
  } = useGameRentals();

  const games = useMemo((): GameCardItem[] => {
    return filteredGamesWithStock.map((game) => ({
      id: game.id,
      name: game.name,
      thumbnail: 'https://cdnfile.koreaboardgames.com/upload/2025-10-13/KiTWN4T0W5nniyHBmzQt.jpg',
      minPlayers: game.minPlayers,
      maxPlayers: game.maxPlayers,
      playTime: game.playTime,
      difficulty: convertDifficulty(game.difficulty),
      genres: game.category ? [game.category] : [],
      isAvailable: game.availableCount > 0,
      totalCount: game.totalCount,
      availableCount: game.availableCount,
      rentedCount: game.rentedCount,
      repairCount: game.repairCount,
    }));
  }, [filteredGamesWithStock]);

  const handleRent = (game: GameCardItem) => {
    // TODO: 룸 선택 다이얼로그 표시
    rentGame(game.id, 'room-101', 101);
  };

  return (
    <div className="flex h-full gap-4">
      <FilterPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <div className="flex-1 overflow-auto">
        <GameList
          games={games}
          onAction={handleRent}
          actionLabel="대여"
          showImage={true}
          showStockDetail={true}
          columns={4}
        />
      </div>
    </div>
  );
}
