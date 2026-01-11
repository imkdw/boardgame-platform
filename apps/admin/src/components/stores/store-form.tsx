'use client';

import type { FormEvent, ReactNode } from 'react';
import { Button, Input, Label } from '@repo/ui';
import type { Store } from '@/lib/stores';

interface Props {
  store?: Store;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isPending: boolean;
}

export function StoreForm({ store, onSubmit, onCancel, isPending }: Props): ReactNode {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">매장명 *</Label>
          <Input
            id="name"
            name="name"
            defaultValue={store?.name}
            placeholder="보드게임 카페 1호점"
            required
            maxLength={100}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact">연락처 *</Label>
          <Input
            id="contact"
            name="contact"
            defaultValue={store?.contact}
            placeholder="02-1234-5678"
            required
            maxLength={20}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">주소 *</Label>
        <Input
          id="address"
          name="address"
          defaultValue={store?.address}
          placeholder="서울시 강남구 테헤란로 123"
          required
          maxLength={200}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="wifiName">와이파이 이름 *</Label>
          <Input
            id="wifiName"
            name="wifiName"
            defaultValue={store?.wifiName}
            placeholder="BoardGame_Cafe_5G"
            required
            maxLength={50}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wifiPassword">와이파이 비밀번호 *</Label>
          <Input
            id="wifiPassword"
            name="wifiPassword"
            defaultValue={store?.wifiPassword}
            placeholder="cafe1234!"
            required
            maxLength={50}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="latitude">위도 *</Label>
          <Input
            id="latitude"
            name="latitude"
            type="number"
            step="any"
            defaultValue={store?.latitude ?? 37.5665}
            placeholder="37.5665"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">경도 *</Label>
          <Input
            id="longitude"
            name="longitude"
            type="number"
            step="any"
            defaultValue={store?.longitude ?? 126.978}
            placeholder="126.978"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="introVideoUrl">소개 영상 URL</Label>
        <Input
          id="introVideoUrl"
          name="introVideoUrl"
          type="url"
          defaultValue={store?.introVideoUrl ?? ''}
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
          취소
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? '처리 중...' : store ? '수정' : '생성'}
        </Button>
      </div>
    </form>
  );
}
