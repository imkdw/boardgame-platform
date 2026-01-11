'use client';

import { useState, type ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from '@repo/ui';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { FoodCategoryForm } from './food-category-form';
import { updateFoodCategory, type FoodCategory, type UpdateFoodCategoryDto } from '@/lib/food-categories';
import { useAsyncAction } from '@repo/web-shared';

interface Props {
  storeId: string;
  category: FoodCategory;
  onSuccess: () => void;
}

function parseFormData(formData: FormData): UpdateFoodCategoryDto {
  return {
    name: formData.get('name') as string,
  };
}

export function EditFoodCategoryDialog({ storeId, category, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return updateFoodCategory(storeId, category.id, data);
    },
    {
      toast,
      successMessage: '카테고리가 수정되었습니다.',
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>카테고리 수정</DialogTitle>
          <DialogDescription>{category.name} 카테고리를 수정합니다.</DialogDescription>
        </DialogHeader>
        <FoodCategoryForm
          category={category}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
