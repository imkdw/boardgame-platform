import { GamesPageContent } from '@/features/games/components';
import { findStoreByIp } from '@/lib/stores-api';
import { getStoreGames } from '@/lib/games-api';

export default async function GamesPage() {
  // TODO: 임시 IP 제거 - 실제 클라이언트 IP를 사용하도록 변경 필요
  const store = await findStoreByIp('1.1.1.1');
  const initialGames = await getStoreGames(store.id);

  return <GamesPageContent storeId={store.id} initialGames={initialGames} />;
}
