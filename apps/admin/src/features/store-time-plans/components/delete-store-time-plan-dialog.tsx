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
import { deleteStoreTimePlan } from '../lib';
import { useAsyncAction } from '@repo/web-shared';
import type { StoreTimePlan } from '@repo/types';

interface Props {
  storeId: string;
  timePlan: StoreTimePlan;
  onSuccess: () => void;
}

export function DeleteStoreTimePlanDialog({ storeId, timePlan, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleDelete, isPending } = useAsyncAction(
    async () => {
      return deleteStoreTimePlan(storeId, timePlan.id);
    },
    {
      toast,
      successMessage: '시간제 플랜이 삭제되었습니다.',
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
          <DialogTitle>시간제 플랜 삭제</DialogTitle>
          <DialogDescription>
            정말로 <span className="font-semibold text-foreground">{timePlan.name}</span> 플랜을 삭제하시겠습니까?
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
