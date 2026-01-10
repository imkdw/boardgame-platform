import { useGameRentals } from '@/hooks/use-game-rentals';
import { ReturnTable } from './components/return-table';

export default function ReturnPage() {
  const { gamesWithStock, returnGame } = useGameRentals();

  const handleReturn = (gameId: string, instanceId: string) => {
    returnGame(gameId, instanceId);
  };

  return (
    <div className="h-full overflow-auto">
      <ReturnTable gamesWithStock={gamesWithStock} onReturn={handleReturn} />
    </div>
  );
}
