import { notFound } from 'next/navigation';
import { GamesPageContent } from '@/features/games/components';
import { findStoreByIp } from '@/lib/stores-api';
import { getStoreGames } from '@/lib/games-api';

export default async function GamesPage() {
  const store = await findStoreByIp('1.1.1.1');

  if (!store) {
    notFound();
  }

  const initialGames = await getStoreGames(store.id);

  return <GamesPageContent storeId={store.id} initialGames={initialGames} />;
}
