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
import { deleteFood, type Food } from '@/lib';
import { useAsyncAction } from '@repo/web-shared';

interface Props {
  storeId: string;
  food: Food;
  onSuccess: () => void;
}

export function DeleteFoodDialog({ storeId, food, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleDelete, isPending } = useAsyncAction(
    async () => {
      return deleteFood(storeId, food.id);
    },
    {
      toast,
      successMessage: '메뉴가 삭제되었습니다.',
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
          <DialogTitle>메뉴 삭제</DialogTitle>
          <DialogDescription>
            정말 <strong>{food.name}</strong> 메뉴를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
