'use client';

import { useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Button } from '@repo/ui';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { StoreTimePlanForm } from './store-time-plan-form';
import { createStoreTimePlan } from '../lib';
import type { CreateStoreTimePlanDto } from '../types';
import { useAsyncAction } from '@repo/web-shared';

interface Props {
  storeId: string;
  onSuccess: () => void;
}

function parseFormData(formData: FormData): CreateStoreTimePlanDto {
  return {
    name: formData.get('name') as string,
    durationMinutes: parseInt(formData.get('durationMinutes') as string, 10),
    price: parseInt(formData.get('price') as string, 10),
    isRecommended: formData.get('isRecommended') === 'on',
  };
}

export function CreateStoreTimePlanDialog({ storeId, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return createStoreTimePlan(storeId, data);
    },
    {
      toast,
      successMessage: '시간제 플랜이 생성되었습니다.',
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
          플랜 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>새 시간제 플랜 생성</DialogTitle>
          <DialogDescription>새로운 시간제 플랜 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <StoreTimePlanForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}
