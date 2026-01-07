import type { Game } from '../types';
import { GameCard } from './game-card';
import { GameEmptyState } from './game-empty-state';

interface Props {
  games: Game[];
}

export function GameList({ games }: Props) {
  if (games.length === 0) {
    return <GameEmptyState />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
