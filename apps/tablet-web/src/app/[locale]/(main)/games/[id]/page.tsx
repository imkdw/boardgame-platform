import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { GameDetail } from '@/features/games/components';
import { findStoreByIp } from '@/lib/stores-api';
import { getStoreGameById } from '@/lib/games-api';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GameDetailPage({ params }: Props): Promise<ReactNode> {
  const { id } = await params;

  const store = await findStoreByIp('1.1.1.1');

  if (!store) {
    notFound();
  }

  const game = await getStoreGameById(store.id, id);

  if (!game) {
    notFound();
  }

  return <GameDetail game={game} />;
}
