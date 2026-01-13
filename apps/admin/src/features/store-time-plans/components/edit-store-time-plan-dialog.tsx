'use client';

import { useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Button } from '@repo/ui';
import { Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import { StoreTimePlanForm } from './store-time-plan-form';
import { updateStoreTimePlan } from '../lib';
import type { UpdateStoreTimePlanDto } from '../types';
import { useAsyncAction } from '@repo/web-shared';
import type { StoreTimePlan } from '@repo/types';

interface Props {
  storeId: string;
  timePlan: StoreTimePlan;
  totalPlans: number;
  onSuccess: () => void;
}

function parseFormData(formData: FormData): UpdateStoreTimePlanDto {
  return {
    name: formData.get('name') as string,
    durationMinutes: parseInt(formData.get('durationMinutes') as string, 10),
    price: parseInt(formData.get('price') as string, 10),
    isRecommended: formData.get('isRecommended') === 'on',
    sort: parseInt(formData.get('sort') as string, 10),
  };
}

export function EditStoreTimePlanDialog({ storeId, timePlan, totalPlans, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return updateStoreTimePlan(storeId, timePlan.id, data);
    },
    {
      toast,
      successMessage: '시간제 플랜이 수정되었습니다.',
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>시간제 플랜 수정 ({timePlan.name})</DialogTitle>
          <DialogDescription>시간제 플랜 정보를 수정해주세요.</DialogDescription>
        </DialogHeader>
        <StoreTimePlanForm
          timePlan={timePlan}
          totalPlans={totalPlans}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
