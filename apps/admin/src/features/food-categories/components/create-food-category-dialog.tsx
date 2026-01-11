'use client';

import { useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Button } from '@repo/ui';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { FoodCategoryForm } from './food-category-form';
import { useAsyncAction } from '@repo/web-shared';
import { createFoodCategory } from '../lib';
import type { CreateFoodCategoryDto } from '../types';

interface Props {
  storeId: string;
  onSuccess: () => void;
}

function parseFormData(formData: FormData): CreateFoodCategoryDto {
  return {
    name: formData.get('name') as string,
  };
}

export function CreateFoodCategoryDialog({ storeId, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return createFoodCategory(storeId, data);
    },
    {
      toast,
      successMessage: '카테고리가 생성되었습니다.',
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
          카테고리 추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 카테고리 생성</DialogTitle>
          <DialogDescription>새로운 음식 카테고리를 추가합니다.</DialogDescription>
        </DialogHeader>
        <FoodCategoryForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}
