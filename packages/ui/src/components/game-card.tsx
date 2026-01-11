'use client';

import { Users, Clock, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { Badge } from './badge';
import { Button } from './button';
import type { GameDifficulty } from '@repo/types';

export interface GameCardItem {
  id: string;
  name: string;
  thumbnail?: string;
  minPlayers: number;
  maxPlayers: number;
  playTime: number;
  difficulty: GameDifficulty;
  genres: string[];
  isAvailable: boolean;
  isRecommended?: boolean;
  // 재고 정보 (옵션)
  stock?: number;
  availableStock?: number;
  // POS용 상세 재고 정보 (옵션)
  totalCount?: number;
  availableCount?: number;
  rentedCount?: number;
  repairCount?: number;
}

interface Props {
  game: GameCardItem;
  onClick?: (game: GameCardItem) => void;
  onAction?: (game: GameCardItem) => void;
  actionLabel?: string;
  showImage?: boolean;
  showStockDetail?: boolean;
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

const defaultLabels = {
  recommended: '추천',
  available: '대여가능',
  unavailable: '대여불가',
  players: '인원',
  playTime: '분',
  difficulty: {
    easy: '쉬움',
    medium: '보통',
    hard: '어려움',
  },
  rented: '대여',
  repair: '수리',
};

function getDifficultyStars(difficulty: GameDifficulty): string {
  switch (difficulty) {
    case 'easy':
      return '★☆☆';
    case 'medium':
      return '★★☆';
    case 'hard':
      return '★★★';
    default:
      return '★☆☆';
  }
}

export function GameCard({
  game,
  onClick,
  onAction,
  actionLabel,
  showImage = true,
  showStockDetail = false,
  labels = defaultLabels,
  className,
}: Props) {
  const mergedLabels = {
    ...defaultLabels,
    ...labels,
    difficulty: { ...defaultLabels.difficulty, ...labels.difficulty } as Record<GameDifficulty, string>,
  };

  const difficultyLabel = mergedLabels.difficulty[game.difficulty];
  const isClickable = !!onClick;

  // 재고 정보 계산
  const availableCount = game.availableCount ?? game.availableStock ?? 0;
  const totalCount = game.totalCount ?? game.stock ?? 0;
  const isAvailable = game.isAvailable && availableCount > 0;

  const handleCardClick = () => {
    if (onClick) {
      onClick(game);
    }
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAction) {
      onAction(game);
    }
  };

  if (!showImage) {
    // POS용 간단한 카드 (이미지 없음)
    return (
      <div
        data-slot="game-card"
        onClick={isClickable ? handleCardClick : undefined}
        className={cn(
          'overflow-hidden rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md',
          !isAvailable && 'opacity-60',
          isClickable && 'cursor-pointer',
          className
        )}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1">
            {game.isRecommended && <Badge variant="default">{mergedLabels.recommended}</Badge>}
            {isAvailable ? (
              <Badge variant="complete">{mergedLabels.available}</Badge>
            ) : (
              <Badge variant="error">{mergedLabels.unavailable}</Badge>
            )}
          </div>

          <h3 className="font-medium text-card-foreground">{game.name}</h3>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5" />
              {game.minPlayers}-{game.maxPlayers}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {game.playTime}
              {mergedLabels.playTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5" />
              {getDifficultyStars(game.difficulty)}
            </span>
          </div>

          {showStockDetail && (
            <StockDisplay
              available={availableCount}
              total={totalCount}
              rented={game.rentedCount ?? 0}
              repair={game.repairCount ?? 0}
              labels={mergedLabels}
            />
          )}

          {onAction && actionLabel && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              disabled={!isAvailable}
              onClick={handleActionClick}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // tablet-web용 풀 카드 (이미지 포함)
  return (
    <div
      data-slot="game-card"
      onClick={isClickable ? handleCardClick : undefined}
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md',
        !isAvailable && 'opacity-60',
        isClickable && 'cursor-pointer',
        className
      )}
    >
      <div className="relative aspect-[3/2] w-full bg-muted">
        {game.thumbnail && <img src={game.thumbnail} alt={game.name} className="h-full w-full object-cover" />}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {game.isRecommended && <Badge variant="default">{mergedLabels.recommended}</Badge>}
          {isAvailable ? (
            <Badge variant="complete">{mergedLabels.available}</Badge>
          ) : (
            <Badge variant="error">{mergedLabels.unavailable}</Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold text-card-foreground">{game.name}</h3>

        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users className="size-4" />
            {game.minPlayers}-{game.maxPlayers}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-4" />
            {game.playTime}
            {mergedLabels.playTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="size-4" />
            {difficultyLabel}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {game.genres.map(genre => (
            <span key={genre} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              #{genre}
            </span>
          ))}
        </div>

        {showStockDetail && (
          <div className="mt-3">
            <StockDisplay
              available={availableCount}
              total={totalCount}
              rented={game.rentedCount ?? 0}
              repair={game.repairCount ?? 0}
              labels={mergedLabels}
            />
          </div>
        )}

        {onAction && actionLabel && (
          <Button
            variant="default"
            size="sm"
            className="mt-3 w-full"
            disabled={!isAvailable}
            onClick={handleActionClick}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

interface StockDisplayProps {
  available: number;
  total: number;
  rented: number;
  repair: number;
  labels: { rented: string; repair: string };
}

function StockDisplay({ available, total, rented, repair, labels }: StockDisplayProps) {
  const getStockColor = () => {
    if (available === 0) return 'text-red-500';
    if (available <= Math.floor(total / 3)) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="flex flex-col gap-0.5">
      <span className={cn('font-semibold', getStockColor())}>
        {available}/{total}
      </span>
      {(rented > 0 || repair > 0) && (
        <span className="text-xs text-muted-foreground">
          {rented > 0 && `${labels.rented} ${rented}`}
          {rented > 0 && repair > 0 && ' / '}
          {repair > 0 && `${labels.repair} ${repair}`}
        </span>
      )}
    </div>
  );
}
