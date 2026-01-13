'use client';

import type { FormEvent, ReactNode } from 'react';
import { Button, Input, Label, Switch } from '@repo/ui';
import type { StoreTimePlan } from '@repo/types';

interface Props {
  timePlan?: StoreTimePlan;
  totalPlans?: number;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isPending: boolean;
}

export function StoreTimePlanForm({ timePlan, totalPlans = 0, onSubmit, onCancel, isPending }: Props): ReactNode {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">플랜 이름 *</Label>
        <Input
          id="name"
          name="name"
          defaultValue={timePlan?.name ?? ''}
          placeholder="예: 2시간"
          required
          maxLength={50}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="durationMinutes">이용 시간 (분) *</Label>
          <Input
            id="durationMinutes"
            name="durationMinutes"
            type="number"
            min={30}
            max={1440}
            defaultValue={timePlan?.durationMinutes ?? 60}
            placeholder="120"
            required
          />
          <p className="text-xs text-muted-foreground">30분 ~ 1440분 (24시간)</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">가격 (원) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            max={1000000}
            step={100}
            defaultValue={timePlan?.price ?? 0}
            placeholder="7000"
            required
          />
          <p className="text-xs text-muted-foreground">0원 ~ 1,000,000원</p>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="isRecommended" className="cursor-pointer">
            추천 플랜
          </Label>
          <p className="text-xs text-muted-foreground">추천 플랜으로 설정하면 고객에게 강조 표시됩니다.</p>
        </div>
        <Switch id="isRecommended" name="isRecommended" defaultChecked={timePlan?.isRecommended ?? false} />
      </div>

      {timePlan && totalPlans > 0 && (
        <div className="space-y-2">
          <Label htmlFor="sort">정렬 순서 *</Label>
          <Input id="sort" name="sort" type="number" min={1} max={totalPlans} defaultValue={timePlan.sort} required />
          <p className="text-xs text-muted-foreground">1 ~ {totalPlans} 사이의 값 (낮을수록 먼저 표시)</p>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
          취소
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? '처리 중...' : timePlan ? '수정' : '생성'}
        </Button>
      </div>
    </form>
  );
}
