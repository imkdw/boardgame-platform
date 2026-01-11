'use client';

import { useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Button } from '@repo/ui';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { StoreRoomForm } from './store-room-form';
import { createStoreRoom, type CreateStoreRoomDto } from '@/components/stores/lib';
import { useAsyncAction } from '@repo/web-shared';

interface Props {
  storeId: string;
  onSuccess: () => void;
}

function parseFormData(formData: FormData): CreateStoreRoomDto {
  return {
    roomNumber: parseInt(formData.get('roomNumber') as string, 10),
    status: formData.get('status') as string,
    minCapacity: parseInt(formData.get('minCapacity') as string, 10),
    maxCapacity: parseInt(formData.get('maxCapacity') as string, 10),
    description: formData.get('description') as string,
  };
}

export function CreateStoreRoomDialog({ storeId, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return createStoreRoom(storeId, data);
    },
    {
      toast,
      successMessage: '방이 생성되었습니다.',
      onSuccess: () => {
        setOpen(false);
        onSuccess();
      },
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />방 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>새 방 생성</DialogTitle>
          <DialogDescription>새로운 방 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <StoreRoomForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}
