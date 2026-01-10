'use client';

import { cn } from '../lib/utils';
import { GameCard, type GameCardItem } from './game-card';

interface Props {
  games: GameCardItem[];
  onClick?: (game: GameCardItem) => void;
  onAction?: (game: GameCardItem) => void;
  actionLabel?: string;
  showImage?: boolean;
  showStockDetail?: boolean;
  columns?: 2 | 3 | 4;
  labels?: {
    recommended?: string;
    available?: string;
    unavailable?: string;
    players?: string;
    playTime?: string;
    difficulty?: {
      easy?: string;
      medium?: string;
      hard?: string;
    };
    rented?: string;
    repair?: string;
  };
  className?: string;
}

const columnClasses = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

export function GameList({
  games,
  onClick,
  onAction,
  actionLabel,
  showImage = true,
  showStockDetail = false,
  columns = 3,
  labels,
  className,
}: Props) {
  return (
    <div data-slot="game-list" className={cn('grid gap-4', columnClasses[columns], className)}>
      {games.map(game => (
        <GameCard
          key={game.id}
          game={game}
          onClick={onClick}
          onAction={onAction}
          actionLabel={actionLabel}
          showImage={showImage}
          showStockDetail={showStockDetail}
          labels={labels}
        />
      ))}
    </div>
  );
}
