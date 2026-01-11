'use client';

import type { ReactNode, FormEvent } from 'react';
import {
  Button,
  Input,
  Label,
  Textarea,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui';
import type { Food, FoodCategory } from '@/components/stores/lib';

interface Props {
  food?: Food;
  categories: FoodCategory[];
  selectedCategoryId?: string;
  isEditMode?: boolean;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  isPending: boolean;
}

export function FoodForm({
  food,
  categories,
  selectedCategoryId,
  isEditMode,
  onSubmit,
  onCancel,
  isPending,
}: Props): ReactNode {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  }

  const defaultCategoryId = selectedCategoryId ?? categories[0]?.id ?? '';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isEditMode && (
        <div className="space-y-2">
          <Label htmlFor="categoryId">카테고리 *</Label>
          <Select name="categoryId" defaultValue={defaultCategoryId} required>
            <SelectTrigger>
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">음식명 *</Label>
        <Input id="name" name="name" placeholder="예: 치즈 피자" defaultValue={food?.name} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">설명 *</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="예: 모짜렐라 치즈가 듬뿍 들어간 피자"
          defaultValue={food?.description}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">가격 (원) *</Label>
        <Input id="price" name="price" type="number" min={0} placeholder="15000" defaultValue={food?.price} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">이미지 URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg"
          defaultValue={food?.imageUrl ?? ''}
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Checkbox id="isPopular" name="isPopular" defaultChecked={food?.isPopular ?? false} />
          <Label htmlFor="isPopular" className="cursor-pointer">
            인기메뉴 (BEST)
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="isNew" name="isNew" defaultChecked={food?.isNew ?? false} />
          <Label htmlFor="isNew" className="cursor-pointer">
            신메뉴 (NEW)
          </Label>
        </div>
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
