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
import { deleteStoreRoom } from '../lib';
import { useAsyncAction } from '@repo/web-shared';
import type { StoreRoom } from '@repo/types';

interface Props {
  storeId: string;
  room: StoreRoom;
  onSuccess: () => void;
}

export function DeleteStoreRoomDialog({ storeId, room, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleDelete, isPending } = useAsyncAction(
    async () => {
      return deleteStoreRoom(storeId, room.id);
    },
    {
      toast,
      successMessage: '방이 삭제되었습니다.',
      onSuccess: () => {
        setOpen(false);
        onSuccess();
      },
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>방 삭제</DialogTitle>
          <DialogDescription>
            정말로 <span className="font-semibold text-foreground">{room.roomNumber}호</span> 방을 삭제하시겠습니까?
            <br />이 작업은 되돌릴 수 없습니다.
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
