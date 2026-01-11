'use client';

import { useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Button } from '@repo/ui';
import { Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import { StoreRoomForm } from './store-room-form';
import { updateStoreRoom } from '@/lib';
import type { UpdateStoreRoomDto } from '@/types';
import { useAsyncAction } from '@repo/web-shared';
import type { StoreRoom } from '@repo/types';

interface Props {
  storeId: string;
  room: StoreRoom;
  onSuccess: () => void;
}

function parseFormData(formData: FormData): UpdateStoreRoomDto {
  return {
    roomNumber: parseInt(formData.get('roomNumber') as string, 10),
    status: formData.get('status') as string,
    minCapacity: parseInt(formData.get('minCapacity') as string, 10),
    maxCapacity: parseInt(formData.get('maxCapacity') as string, 10),
    description: formData.get('description') as string,
  };
}

export function EditStoreRoomDialog({ storeId, room, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return updateStoreRoom(storeId, room.id, data);
    },
    {
      toast,
      successMessage: '방이 수정되었습니다.',
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
          <Edit2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>방 수정 ({room.roomNumber}호)</DialogTitle>
          <DialogDescription>방 정보를 수정해주세요.</DialogDescription>
        </DialogHeader>
        <StoreRoomForm room={room} onSubmit={handleSubmit} onCancel={() => setOpen(false)} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}
