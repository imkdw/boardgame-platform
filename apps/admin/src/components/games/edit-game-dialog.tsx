'use client';

import { useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Button } from '@repo/ui';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { GameForm } from './game-form';
import type { StoreGame, GameDifficulty } from '@repo/types';
import { updateGame } from '@/lib';
import type { UpdateGameDto } from '@/types';
import { useAsyncAction } from '@repo/web-shared';

interface Props {
  storeId: string;
  game: StoreGame;
  onSuccess: () => void;
}

function parseFormData(formData: FormData): UpdateGameDto {
  const genres = formData.getAll('genres') as string[];
  const imagesStr = formData.get('images') as string;
  const images = imagesStr
    ? imagesStr
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    : [];

  return {
    name: formData.get('name') as string,
    thumbnail: (formData.get('thumbnail') as string) || null,
    images,
    minPlayers: parseInt(formData.get('minPlayers') as string, 10),
    maxPlayers: parseInt(formData.get('maxPlayers') as string, 10),
    playTime: parseInt(formData.get('playTime') as string, 10),
    difficulty: formData.get('difficulty') as GameDifficulty,
    genres,
    isRecommended: formData.get('isRecommended') === 'on',
    stock: parseInt(formData.get('stock') as string, 10),
    availableStock: parseInt(formData.get('availableStock') as string, 10),
    description: formData.get('description') as string,
    rules: formData.get('rules') as string,
    videoUrl: (formData.get('videoUrl') as string) || null,
  };
}

export function EditGameDialog({ storeId, game, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return updateGame(storeId, game.id, data);
    },
    {
      toast,
      successMessage: '게임이 수정되었습니다.',
      onSuccess: () => {
        setOpen(false);
        onSuccess();
      },
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>게임 수정</DialogTitle>
          <DialogDescription>{game.name} 정보를 수정합니다.</DialogDescription>
        </DialogHeader>
        <GameForm game={game} onSubmit={handleSubmit} onCancel={() => setOpen(false)} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}
