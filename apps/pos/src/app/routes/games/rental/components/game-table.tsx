import { Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui';
import type { GameWithStock } from '@/types/pos';
import { getDifficultyStars } from '@/hooks/use-game-rentals';

interface Props {
  games: GameWithStock[];
  onRent: (gameId: string) => void;
}

export function GameTable({ games, onRent }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>게임명</TableHead>
          <TableHead>재고</TableHead>
          <TableHead>인원</TableHead>
          <TableHead>시간</TableHead>
          <TableHead>난이도</TableHead>
          <TableHead>대여</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game) => {
          const isAvailable = game.availableCount > 0;
          const allRented = game.availableCount === 0 && game.rentedCount > 0;
          const allRepair = game.availableCount === 0 && game.repairCount === game.totalCount;

          return (
            <TableRow key={game.id}>
              <TableCell className="font-medium">{game.name}</TableCell>
              <TableCell>
                <StockDisplay
                  available={game.availableCount}
                  total={game.totalCount}
                  rented={game.rentedCount}
                  repair={game.repairCount}
                />
              </TableCell>
              <TableCell>
                {game.minPlayers}-{game.maxPlayers}명
              </TableCell>
              <TableCell>{game.playTime}분</TableCell>
              <TableCell>{getDifficultyStars(game.difficulty)}</TableCell>
              <TableCell>
                {isAvailable ? (
                  <Button size="sm" onClick={() => onRent(game.id)}>
                    대여
                  </Button>
                ) : allRepair ? (
                  <Badge variant="outline">전체 수리중</Badge>
                ) : allRented ? (
                  <Badge variant="secondary">전체 대여중</Badge>
                ) : (
                  <Badge variant="outline">대여 불가</Badge>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

interface StockDisplayProps {
  available: number;
  total: number;
  rented: number;
  repair: number;
}

function StockDisplay({ available, total, rented, repair }: StockDisplayProps) {
  const getStockColor = () => {
    if (available === 0) return 'text-red-500';
    if (available <= Math.floor(total / 3)) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="flex flex-col gap-0.5">
      <span className={`font-semibold ${getStockColor()}`}>
        {available}/{total}
      </span>
      {(rented > 0 || repair > 0) && (
        <span className="text-xs text-muted-foreground">
          {rented > 0 && `대여 ${rented}`}
          {rented > 0 && repair > 0 && ' / '}
          {repair > 0 && `수리 ${repair}`}
        </span>
      )}
    </div>
  );
}
