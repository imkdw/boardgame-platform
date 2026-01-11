'use client';

import { useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Button } from '@repo/ui';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { FoodForm } from './food-form';
import { updateFood } from '../lib';
import type { Food } from '@repo/types';
import type { UpdateFoodDto } from '../types';
import { useAsyncAction } from '@repo/web-shared';

interface Props {
  storeId: string;
  food: Food;
  onSuccess: () => void;
}

function parseFormData(formData: FormData): UpdateFoodDto {
  return {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    isPopular: formData.get('isPopular') === 'on',
    isNew: formData.get('isNew') === 'on',
    imageUrl: (formData.get('imageUrl') as string) || null,
  };
}

export function EditFoodDialog({ storeId, food, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return updateFood(storeId, food.id, data);
    },
    {
      toast,
      successMessage: '메뉴가 수정되었습니다.',
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>메뉴 수정</DialogTitle>
          <DialogDescription>{food.name} 메뉴를 수정합니다.</DialogDescription>
        </DialogHeader>
        <FoodForm
          food={food}
          categories={[]}
          isEditMode
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
