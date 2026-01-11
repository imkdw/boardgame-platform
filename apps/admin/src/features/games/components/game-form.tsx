'use client';

import type { FormEvent, ReactNode } from 'react';
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
import type { StoreGame } from '@repo/types';
import { GAME_DIFFICULTY, GAME_GENRE_VALUES } from '@repo/consts';

interface Props {
  game?: StoreGame;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isPending: boolean;
}

export function GameForm({ game, onSubmit, onCancel, isPending }: Props): ReactNode {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">게임명 *</Label>
          <Input id="name" name="name" defaultValue={game?.name} placeholder="스플렌더" required maxLength={100} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">난이도 *</Label>
          <Select name="difficulty" defaultValue={game?.difficulty ?? GAME_DIFFICULTY.MEDIUM} required>
            <SelectTrigger>
              <SelectValue placeholder="난이도 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={GAME_DIFFICULTY.EASY}>쉬움</SelectItem>
              <SelectItem value={GAME_DIFFICULTY.MEDIUM}>보통</SelectItem>
              <SelectItem value={GAME_DIFFICULTY.HARD}>어려움</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="minPlayers">최소 인원 *</Label>
          <Input
            id="minPlayers"
            name="minPlayers"
            type="number"
            min={1}
            max={20}
            defaultValue={game?.minPlayers ?? 2}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxPlayers">최대 인원 *</Label>
          <Input
            id="maxPlayers"
            name="maxPlayers"
            type="number"
            min={1}
            max={20}
            defaultValue={game?.maxPlayers ?? 4}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="playTime">플레이 시간 (분) *</Label>
          <Input
            id="playTime"
            name="playTime"
            type="number"
            min={1}
            max={600}
            defaultValue={game?.playTime ?? 30}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="stock">총 재고 *</Label>
          <Input id="stock" name="stock" type="number" min={0} defaultValue={game?.stock ?? 1} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="availableStock">이용 가능 재고 *</Label>
          <Input
            id="availableStock"
            name="availableStock"
            type="number"
            min={0}
            defaultValue={game?.availableStock ?? 1}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>장르 *</Label>
        <div className="grid grid-cols-3 gap-2 rounded-md border p-3 sm:grid-cols-4 md:grid-cols-6">
          {GAME_GENRE_VALUES.map(genre => (
            <div key={genre} className="flex items-center gap-2">
              <Checkbox
                id={`genre-${genre}`}
                name="genres"
                value={genre}
                defaultChecked={game?.genres.includes(genre)}
              />
              <Label htmlFor={`genre-${genre}`} className="cursor-pointer text-sm">
                {genre}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">게임 설명 *</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={game?.description}
          placeholder="게임에 대한 간단한 설명을 입력하세요."
          rows={3}
          maxLength={2000}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rules">게임 규칙 *</Label>
        <Textarea
          id="rules"
          name="rules"
          defaultValue={game?.rules}
          placeholder="게임 규칙을 입력하세요."
          rows={3}
          maxLength={2000}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="thumbnail">썸네일 URL</Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            type="url"
            defaultValue={game?.thumbnail ?? ''}
            placeholder="https://example.com/thumbnail.jpg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="videoUrl">영상 URL</Label>
          <Input
            id="videoUrl"
            name="videoUrl"
            type="url"
            defaultValue={game?.videoUrl ?? ''}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">추가 이미지 URL (콤마로 구분)</Label>
        <Input
          id="images"
          name="images"
          defaultValue={game?.images.join(', ') ?? ''}
          placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="isRecommended" name="isRecommended" defaultChecked={game?.isRecommended ?? false} />
        <Label htmlFor="isRecommended" className="cursor-pointer">
          추천 게임으로 표시
        </Label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
          취소
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? '처리 중...' : game ? '수정' : '생성'}
        </Button>
      </div>
    </form>
  );
}
