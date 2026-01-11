'use client';

import { useState, type ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from '@repo/ui';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteGame } from '@/lib';
import type { StoreGame } from '@repo/types';
import { useAsyncAction } from '@repo/web-shared';

interface Props {
  storeId: string;
  game: StoreGame;
  onSuccess: () => void;
}

export function DeleteGameDialog({ storeId, game, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleDelete, isPending } = useAsyncAction(
    async () => {
      return deleteGame(storeId, game.id);
    },
    {
      toast,
      successMessage: '게임이 삭제되었습니다.',
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
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게임 삭제</DialogTitle>
          <DialogDescription>
            정말 <strong>{game.name}</strong>을(를) 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
            취소
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? '삭제 중...' : '삭제'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
