'use client';

import type { ReactNode, FormEvent } from 'react';
import { Button, Input, Label } from '@repo/ui';
import type { FoodCategory } from '@/lib/food-categories';

interface Props {
  category?: FoodCategory;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  isPending: boolean;
}

export function FoodCategoryForm({ category, onSubmit, onCancel, isPending }: Props): ReactNode {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">카테고리명 *</Label>
        <Input
          id="name"
          name="name"
          placeholder="예: 음료, 스낵, 식사류"
          defaultValue={category?.name}
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
          취소
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? '저장 중...' : '저장'}
        </Button>
      </div>
    </form>
  );
}
