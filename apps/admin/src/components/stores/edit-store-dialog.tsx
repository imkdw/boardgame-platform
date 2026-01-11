'use client';

import { useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Button } from '@repo/ui';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { StoreForm } from './store-form';
import type { Store } from '@repo/types';
import { updateStore } from '@/lib';
import type { UpdateStoreDto } from '@/types';
import { useAsyncAction } from '@repo/web-shared';

interface Props {
  store: Store;
  onSuccess: () => void;
}

function parseFormData(formData: FormData): UpdateStoreDto {
  return {
    name: formData.get('name') as string,
    address: formData.get('address') as string,
    wifiName: formData.get('wifiName') as string,
    wifiPassword: formData.get('wifiPassword') as string,
    contact: formData.get('contact') as string,
    introVideoUrl: (formData.get('introVideoUrl') as string) || null,
    ip: formData.get('ip') as string,
    latitude: parseFloat(formData.get('latitude') as string),
    longitude: parseFloat(formData.get('longitude') as string),
  };
}

export function EditStoreDialog({ store, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return updateStore(store.id, data);
    },
    {
      toast,
      successMessage: '매장이 수정되었습니다.',
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>매장 수정</DialogTitle>
          <DialogDescription>{store.name} 정보를 수정합니다.</DialogDescription>
        </DialogHeader>
        <StoreForm store={store} onSubmit={handleSubmit} onCancel={() => setOpen(false)} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}
