'use client';

import { useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Button } from '@repo/ui';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { FoodForm } from './food-form';
import { createFood } from '@/lib';
import type { CreateFoodDto } from '@/types';
import type { FoodCategory } from '@repo/types';
import { useAsyncAction } from '@repo/web-shared';

interface Props {
  storeId: string;
  categories: FoodCategory[];
  selectedCategoryId: string | null;
  onSuccess: () => void;
}

function parseFormData(formData: FormData): CreateFoodDto {
  return {
    categoryId: formData.get('categoryId') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    isPopular: formData.get('isPopular') === 'on',
    isNew: formData.get('isNew') === 'on',
    imageUrl: (formData.get('imageUrl') as string) || null,
  };
}

export function CreateFoodDialog({ storeId, categories, selectedCategoryId, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return createFood(storeId, data);
    },
    {
      toast,
      successMessage: '메뉴가 생성되었습니다.',
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
          메뉴 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>새 메뉴 등록</DialogTitle>
          <DialogDescription>새로운 메뉴를 추가합니다.</DialogDescription>
        </DialogHeader>
        <FoodForm
          categories={categories}
          selectedCategoryId={selectedCategoryId ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
