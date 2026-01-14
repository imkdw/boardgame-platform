import type { ReactNode } from 'react';

import { GameVideoContent } from '@/features/games/components';
import { findStoreByIp } from '@/lib/stores-api';
import { getStoreGameById } from '@/lib/games-api';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GameVideoPage({ params }: Props): Promise<ReactNode> {
  const { id } = await params;
  // TODO: 임시 IP 제거 - 실제 클라이언트 IP를 사용하도록 변경 필요
  const store = await findStoreByIp('1.1.1.1');
  const game = await getStoreGameById(store.id, id);

  return (
    <GameVideoContent
      gameId={id}
      gameName={game.name}
      videoSrc="/videos/song.mp4"
    />
  );
}
