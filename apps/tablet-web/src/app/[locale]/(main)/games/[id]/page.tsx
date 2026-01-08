'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import type { ReactNode } from 'react';

import { GameDetail, mockGames } from '@/features/games';

interface Props {
  params: Promise<{ id: string }>;
}

export default function GameDetailPage({ params }: Props): ReactNode {
  const { id } = use(params);

  const game = mockGames.find(g => g.id === id);

  if (!game) {
    notFound();
  }

  return <GameDetail game={game} />;
}
