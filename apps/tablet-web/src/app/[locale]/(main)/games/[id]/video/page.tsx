'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from '@repo/ui';
import { Link } from '@/i18n/navigation';

import { mockGames } from '@/features/games';

interface Props {
  params: Promise<{ id: string }>;
}

export default function GameVideoPage({ params }: Props): ReactNode {
  const { id } = use(params);
  const t = useTranslations('GameDetail.video');

  const game = mockGames.find(g => g.id === id);

  if (!game) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-4 border-b border-border p-4">
        <Link href={`/games/${id}`}>
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{game.name}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <Play className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="text-xl font-medium text-muted-foreground">{t('comingSoon')}</p>
        </div>
      </div>
    </div>
  );
}
