import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui';
import type { GameInstance, GameWithStock } from '@/types/pos';
import { formatTimeShort } from '@/lib/format';

interface RentedGameView {
  instance: GameInstance;
  gameName: string;
}

interface Props {
  gamesWithStock: GameWithStock[];
  onReturn: (gameId: string, instanceId: string) => void;
}

export function ReturnTable({ gamesWithStock, onReturn }: Props) {
  // 모든 대여 중인 인스턴스를 게임 이름과 함께 플랫하게 변환
  const rentedGames: RentedGameView[] = gamesWithStock.flatMap((game) =>
    game.rentedInstances.map((instance) => ({
      instance,
      gameName: game.name,
    }))
  );

  if (rentedGames.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">대여중인 게임이 없습니다</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>게임명</TableHead>
          <TableHead>대여 룸</TableHead>
          <TableHead>대여 시간</TableHead>
          <TableHead>액션</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rentedGames.map(({ instance, gameName }) => (
          <TableRow key={instance.id}>
            <TableCell className="font-medium">{gameName}</TableCell>
            <TableCell>{instance.rentedToRoomNumber}번방</TableCell>
            <TableCell>{instance.rentedAt ? formatTimeShort(instance.rentedAt) : '-'}</TableCell>
            <TableCell>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onReturn(instance.gameId, instance.id)}
              >
                반납
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
