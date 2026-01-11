'use client';

import type { FormEvent, ReactNode } from 'react';
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui';
import type { StoreRoom } from '@repo/types';

interface Props {
  room?: StoreRoom;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isPending: boolean;
}

const STATUS_VALUES = ['AVAILABLE', 'IN_USE', 'RESERVED', 'MAINTENANCE'] as const;

export function StoreRoomForm({ room, onSubmit, onCancel, isPending }: Props): ReactNode {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="roomNumber">방 번호 *</Label>
          <Input
            id="roomNumber"
            name="roomNumber"
            type="number"
            min="1"
            defaultValue={room?.roomNumber ?? 1}
            placeholder="1"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">방 상태 *</Label>
          <Select name="status" defaultValue={room?.status ?? 'AVAILABLE'}>
            <SelectTrigger>
              <SelectValue placeholder="상태 선택" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_VALUES.map(status => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="minCapacity">최소 이용자 수 *</Label>
          <Input
            id="minCapacity"
            name="minCapacity"
            type="number"
            min="1"
            max="100"
            defaultValue={room?.minCapacity ?? 2}
            placeholder="2"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxCapacity">최대 이용자 수 *</Label>
          <Input
            id="maxCapacity"
            name="maxCapacity"
            type="number"
            min="1"
            max="100"
            defaultValue={room?.maxCapacity ?? 6}
            placeholder="6"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">방 소개 *</Label>
        <textarea
          id="description"
          name="description"
          defaultValue={room?.description ?? ''}
          placeholder="방에 대한 설명을 입력해주세요."
          required
          maxLength={500}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
          취소
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? '처리 중...' : room ? '수정' : '생성'}
        </Button>
      </div>
    </form>
  );
}
