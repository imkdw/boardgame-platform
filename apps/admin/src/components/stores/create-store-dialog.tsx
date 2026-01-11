'use client';

import { useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Button } from '@repo/ui';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { StoreForm } from './store-form';
import { createStore } from '@/lib';
import type { CreateStoreDto } from '@/types';
import { useAsyncAction } from '@repo/web-shared';

interface Props {
  onSuccess: () => void;
}

function parseFormData(formData: FormData): CreateStoreDto {
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

export function CreateStoreDialog({ onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return createStore(data);
    },
    {
      toast,
      successMessage: '매장이 생성되었습니다.',
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
          <Plus className="size-4" />
          매장 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>새 매장 생성</DialogTitle>
          <DialogDescription>새로운 매장 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <StoreForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}
