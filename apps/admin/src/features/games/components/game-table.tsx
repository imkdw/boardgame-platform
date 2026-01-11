'use client';

import type { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge } from '@repo/ui';
import { Gamepad2, Users, Clock, Star } from 'lucide-react';
import type { StoreGame } from '@repo/types';
import { EditGameDialog } from './edit-game-dialog';
import { DeleteGameDialog } from './delete-game-dialog';

interface Props {
  storeId: string;
  games: StoreGame[];
  onRefresh: () => void;
}

function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return '쉬움';
    case 'medium':
      return '보통';
    case 'hard':
      return '어려움';
    default:
      return difficulty;
  }
}

function getDifficultyColor(difficulty: string): 'default' | 'secondary' | 'destructive' {
  switch (difficulty) {
    case 'easy':
      return 'secondary';
    case 'medium':
      return 'default';
    case 'hard':
      return 'destructive';
    default:
      return 'default';
  }
}

export function GameTable({ storeId, games, onRefresh }: Props): ReactNode {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Gamepad2 className="mb-4 size-12" />
        <p>등록된 게임이 없습니다.</p>
        <p className="text-sm">새 게임을 추가해주세요.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>게임명</TableHead>
          <TableHead>인원</TableHead>
          <TableHead>시간</TableHead>
          <TableHead>난이도</TableHead>
          <TableHead>장르</TableHead>
          <TableHead>재고</TableHead>
          <TableHead className="w-24 text-center">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map(game => (
          <TableRow key={game.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                  <Gamepad2 className="size-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{game.name}</span>
                    {game.isRecommended && <Star className="size-4 fill-yellow-400 text-yellow-400" />}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="size-4 shrink-0" />
                <span className="text-sm">
                  {game.minPlayers}-{game.maxPlayers}명
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4 shrink-0" />
                <span className="text-sm">{game.playTime}분</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={getDifficultyColor(game.difficulty)}>{getDifficultyLabel(game.difficulty)}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {game.genres.slice(0, 3).map(genre => (
                  <Badge key={genre} variant="outline" className="text-xs">
                    {genre}
                  </Badge>
                ))}
                {game.genres.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{game.genres.length - 3}
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <span
                className={
                  game.availableStock === 0
                    ? 'text-destructive'
                    : game.availableStock < game.stock
                      ? 'text-yellow-600'
                      : 'text-green-600'
                }
              >
                {game.availableStock}/{game.stock}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-1">
                <EditGameDialog storeId={storeId} game={game} onSuccess={onRefresh} />
                <DeleteGameDialog storeId={storeId} game={game} onSuccess={onRefresh} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
