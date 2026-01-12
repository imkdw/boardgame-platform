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
  const game = await getStoreGameById(store.id, id);

  return <GameDetail game={game} />;
}
