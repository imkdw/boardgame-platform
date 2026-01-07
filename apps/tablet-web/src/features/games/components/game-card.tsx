import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Users, Clock, Star } from 'lucide-react';
import { Badge, cn } from '@repo/ui';
import type { Game } from '../types';

interface Props {
  game: Game;
}

export function GameCard({ game }: Props) {
  const t = useTranslations('GameSearch.card');

  const difficultyLabel = {
    easy: t('difficulty.easy'),
    medium: t('difficulty.medium'),
    hard: t('difficulty.hard'),
  };

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md',
        !game.isAvailable && 'opacity-60'
      )}
    >
      <div className="relative aspect-[3/2] w-full bg-muted">
        <Image
          src={game.thumbnail}
          alt={game.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {game.isRecommended && <Badge variant="default">{t('recommended')}</Badge>}
          {game.isAvailable ? (
            <Badge variant="complete">{t('available')}</Badge>
          ) : (
            <Badge variant="error">{t('unavailable')}</Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold text-card-foreground">{game.name}</h3>

        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users className="h-4 w-4" />
            {t('players', { min: game.minPlayers, max: game.maxPlayers })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {t('playTime', { time: game.playTime })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4" />
            {difficultyLabel[game.difficulty]}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {game.genres.map(genre => (
            <span key={genre} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              #{genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
