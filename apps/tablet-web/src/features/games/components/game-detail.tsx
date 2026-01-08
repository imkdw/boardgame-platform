'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Users, Clock, Star } from 'lucide-react';
import { Badge, Button, cn } from '@repo/ui';
import { Link } from '@/i18n/navigation';
import { toast } from 'sonner';
import type { Game } from '../types';

interface Props {
  game: Game;
}

export function GameDetail({ game }: Props) {
  const t = useTranslations('GameDetail');

  const difficultyLabel = {
    easy: t('difficulty.easy'),
    medium: t('difficulty.medium'),
    hard: t('difficulty.hard'),
  };

  const handleRequestGame = () => {
    toast.success(t('toast.requestSuccess'));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="absolute left-4 top-4 z-10">
        <Link href="/games">
          <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full shadow-lg">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">{t('back')}</span>
          </Button>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="relative h-[40vh] w-full bg-muted">
          <Image src={game.thumbnail} alt={game.name} fill className="object-cover" priority sizes="100vw" />

          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {game.isRecommended && (
              <Badge variant="default" className="text-sm">
                {t('recommended')}
              </Badge>
            )}
            {game.isAvailable ? (
              <Badge variant="complete" className="text-sm">
                {t('availability.available')} ({game.availableStock}/{game.stock})
              </Badge>
            ) : (
              <Badge variant="error" className="text-sm">
                {t('availability.unavailable')}
              </Badge>
            )}
          </div>
        </div>

        {game.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto p-4">
            {game.images.map((image, index) => (
              <div
                key={index}
                className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-border"
              >
                <Image src={image} alt={`${game.name} ${index + 1}`} fill className="object-cover" sizes="80px" />
              </div>
            ))}
          </div>
        )}

        <div className="space-y-6 p-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{game.name}</h1>
            <p className="text-sm text-muted-foreground">{game.nameEn}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {t('players', { min: game.minPlayers, max: game.maxPlayers })}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{t('playTime', { time: game.playTime })}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{difficultyLabel[game.difficulty]}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {game.genres.map(genre => (
              <span key={genre} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                #{genre}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">{t('sections.description')}</h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{game.description}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">{t('sections.rules')}</h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{game.rules}</p>
          </div>

          <div className="h-32" />
        </div>
      </div>

      <div className={cn('fixed bottom-0 left-0 right-0 z-20', 'border-t border-border bg-background', 'p-4 pb-safe')}>
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            className="h-14 w-full text-base font-semibold"
            onClick={handleRequestGame}
            disabled={!game.isAvailable}
          >
            {t('actions.requestGame')}
          </Button>
          <Link href={`/games/${game.id}/video`} className="w-full">
            <Button variant="outline" size="lg" className="h-14 w-full text-base font-semibold">
              {t('actions.watchTutorial')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
