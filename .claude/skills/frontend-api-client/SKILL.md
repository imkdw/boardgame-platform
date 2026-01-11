---
name: frontend-api-client
description: Guide for implementing CRUD API integration in Next.js client components.
---

# Frontend API Client Skill

Next.js 클라이언트 컴포넌트에서 CRUD API를 연동하는 패턴 가이드입니다.

## 패키지 구조

```
packages/
  web-shared/                    # 공유 웹 유틸리티
    src/
      api-client/
        api-error.ts             # ApiError 클래스
        fetch-api.ts             # createFetchApi 팩토리
        index.ts                 # barrel export
      hooks/
        use-async-action.ts      # 비동기 액션 훅
        index.ts
      get-api-error-message.ts   # 에러 메시지 변환
      index.ts

  shared/
    types/src/
      api-response.type.ts       # ApiResponse<T> 타입
    exception/src/
      exception-messages.ts      # 에러 코드별 메시지 매핑

apps/<app>/src/
  lib/
    api.ts                       # fetchApi 인스턴스 생성
    <feature>.ts                 # 도메인별 API 함수
    types/
      <feature>.types.ts         # 도메인별 타입 정의
      index.ts
    index.ts                     # barrel export
  components/
    <feature>/
      <feature>-page-client.tsx  # 메인 클라이언트 컴포넌트
      create-<feature>-dialog.tsx
      edit-<feature>-dialog.tsx
      delete-<feature>-dialog.tsx
      <feature>-form.tsx
      <feature>-table.tsx
      index.ts
```

## 1. 공유 패키지 (packages/web-shared)

### ApiError 클래스

```typescript
// packages/web-shared/src/api-client/api-error.ts
import type { ExceptionResponse } from '@repo/types';

export class ApiError extends Error {
  public apiStack?: unknown;

  constructor(
    public status: number,
    public errorCode: string,
    public path: string,
    apiStack?: unknown
  ) {
    super(`API Error: ${status} ${errorCode}`);
    this.name = 'ApiError';
    this.apiStack = apiStack;
  }

  static fromResponse(response: ExceptionResponse): ApiError {
    return new ApiError(response.statusCode, response.errorCode, response.path, response.stack);
  }
}
```

### fetchApi 팩토리

```typescript
// packages/web-shared/src/api-client/fetch-api.ts
import type { ExceptionResponse } from '@repo/types';
import { ApiError } from './api-error';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

interface CreateFetchApiOptions {
  baseUrl: string;
  defaultTimeout?: number;
}

export function createFetchApi(options: CreateFetchApiOptions) {
  const { baseUrl, defaultTimeout = 10000 } = options;

  return async function fetchApi<T>(endpoint: string, fetchOptions: FetchOptions = {}): Promise<T> {
    const { timeout = defaultTimeout, ...restOptions } = fetchOptions;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...restOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...restOptions.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as ExceptionResponse | null;
        if (body) {
          throw ApiError.fromResponse(body);
        }
        throw new ApiError(response.status, 'UNKNOWN_ERROR', endpoint);
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };
}
```

### 에러 메시지 변환

```typescript
// packages/web-shared/src/get-api-error-message.ts
import { EXCEPTION_MESSAGES } from '@repo/exception';
import { ApiError } from './api-client';

function isApiError(error: unknown): error is ApiError {
  return (
    error instanceof ApiError ||
    (error !== null &&
      typeof error === 'object' &&
      'name' in error &&
      error.name === 'ApiError' &&
      'errorCode' in error)
  );
}

export function getApiErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    const message = EXCEPTION_MESSAGES[error.errorCode as keyof typeof EXCEPTION_MESSAGES] as string | undefined;
    return message ?? '알 수 없는 오류가 발생했습니다.';
  }
  return error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
}
```

### useAsyncAction 훅

```typescript
// packages/web-shared/src/hooks/use-async-action.ts
'use client';

import { useState, useCallback } from 'react';
import { getApiErrorMessage } from '../get-api-error-message';

interface Toast {
  success: (message: string) => void;
  error: (message: string) => void;
}

interface UseAsyncActionOptions<T> {
  toast: Toast;
  onSuccess?: (result: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  showErrorToast?: boolean;
}

interface UseAsyncActionReturn<TArgs extends unknown[], TResult> {
  execute: (...args: TArgs) => Promise<TResult | undefined>;
  isPending: boolean;
}

export function useAsyncAction<TArgs extends unknown[], TResult>(
  action: (...args: TArgs) => Promise<TResult>,
  options: UseAsyncActionOptions<TResult>
): UseAsyncActionReturn<TArgs, TResult> {
  const { toast, onSuccess, onError, successMessage, showErrorToast = true } = options;
  const [isPending, setIsPending] = useState(false);

  const execute = useCallback(
    async (...args: TArgs): Promise<TResult | undefined> => {
      setIsPending(true);
      try {
        const result = await action(...args);
        if (successMessage) {
          toast.success(successMessage);
        }
        onSuccess?.(result);
        return result;
      } catch (error) {
        if (showErrorToast) {
          toast.error(getApiErrorMessage(error));
        }
        onError?.(error);
        return undefined;
      } finally {
        setIsPending(false);
      }
    },
    [action, toast, onSuccess, onError, successMessage, showErrorToast]
  );

  return { execute, isPending };
}
```

## 2. 앱 레벨 설정 (apps/<app>/src/lib)

### API 인스턴스 생성

```typescript
// apps/<app>/src/lib/api.ts
import { createFetchApi, ApiError } from '@repo/web-shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/v1';

const fetchApi = createFetchApi({ baseUrl: API_BASE_URL });

export { fetchApi, ApiError };
```

### 타입 정의

```typescript
// apps/<app>/src/lib/types/<feature>.types.ts
export interface Store {
  id: string;
  name: string;
  address: string;
  wifiName: string;
  wifiPassword: string;
  contact: string;
  introVideoUrl: string | null;
  latitude: number;
  longitude: number;
}

export interface CreateStoreDto {
  name: string;
  address: string;
  wifiName: string;
  wifiPassword: string;
  contact: string;
  introVideoUrl: string | null;
  latitude: number;
  longitude: number;
}

export interface UpdateStoreDto {
  name: string;
  address: string;
  wifiName: string;
  wifiPassword: string;
  contact: string;
  introVideoUrl: string | null;
  latitude: number;
  longitude: number;
}
```

```typescript
// apps/<app>/src/lib/types/index.ts
export * from './<feature>.types';
```

### API 함수

```typescript
// apps/<app>/src/lib/<feature>.ts
import type { ApiResponse } from '@repo/types';
import { fetchApi } from './api';
import type { Store, CreateStoreDto, UpdateStoreDto } from './types';

// 타입 re-export
export type { Store, CreateStoreDto, UpdateStoreDto } from './types';

// GET (목록)
export async function getStores(): Promise<Store[]> {
  const response = await fetchApi<ApiResponse<Store[]>>('/stores');
  return response.data;
}

// GET (단건)
export async function getStore(storeId: string): Promise<Store> {
  const response = await fetchApi<ApiResponse<Store>>(`/stores/${storeId}`);
  return response.data;
}

// POST
export async function createStore(data: CreateStoreDto): Promise<Store> {
  const response = await fetchApi<ApiResponse<Store>>('/stores', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data;
}

// PUT (204 No Content)
export async function updateStore(storeId: string, data: UpdateStoreDto): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// DELETE (204 No Content)
export async function deleteStore(storeId: string): Promise<void> {
  await fetchApi<undefined>(`/stores/${storeId}`, {
    method: 'DELETE',
  });
}
```

```typescript
// apps/<app>/src/lib/index.ts
export * from './api';
export * from './<feature>';
```

## 3. 컴포넌트 패턴

### 메인 클라이언트 컴포넌트

```typescript
// apps/<app>/src/components/<feature>/<feature>-page-client.tsx
'use client';

import { useEffect, useState, useCallback, type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getStores, type Store } from '@/lib/stores';
import { getApiErrorMessage } from '@repo/web-shared';
import { CreateStoreDialog } from './create-store-dialog';
import { StoreTable } from './store-table';

export function StoresPageClient(): ReactNode {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = useCallback(async () => {
    try {
      setError(null);
      const data = await getStores();
      setStores(data);
    } catch (e) {
      const message = getApiErrorMessage(e);
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const handleRefresh = useCallback(() => {
    fetchStores();
  }, [fetchStores]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">매장 관리</h1>
        <CreateStoreDialog onSuccess={handleRefresh} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>매장 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-8 text-center text-destructive">
              <p>{error}</p>
            </div>
          ) : (
            <StoreTable stores={stores} onRefresh={handleRefresh} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

### Create Dialog (useAsyncAction 사용)

```typescript
// apps/<app>/src/components/<feature>/create-<feature>-dialog.tsx
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
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { StoreForm } from './store-form';
import { createStore, type CreateStoreDto } from '@/lib/stores';
import { useAsyncAction } from '@repo/web-shared';

interface Props {
  onSuccess: () => void;
}

function parseFormData(formData: FormData): CreateStoreDto {
  return {
    name: formData.get('name') as string,
    address: formData.get('address') as string,
    wifiName: formData.get('wifiName') as string,
    wifiPassword: formData.get('wifiPassword') as string,
    contact: formData.get('contact') as string,
    introVideoUrl: (formData.get('introVideoUrl') as string) || null,
    latitude: parseFloat(formData.get('latitude') as string),
    longitude: parseFloat(formData.get('longitude') as string),
  };
}

export function CreateStoreDialog({ onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return createStore(data);
    },
    {
      toast,
      successMessage: '매장이 생성되었습니다.',
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
          매장 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>새 매장 생성</DialogTitle>
          <DialogDescription>새로운 매장 정보를 입력해주세요.</DialogDescription>
        </DialogHeader>
        <StoreForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}
```

### Edit Dialog

```typescript
// apps/<app>/src/components/<feature>/edit-<feature>-dialog.tsx
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
import { StoreForm } from './store-form';
import { updateStore, type Store, type UpdateStoreDto } from '@/lib/stores';
import { useAsyncAction } from '@repo/web-shared';

interface Props {
  store: Store;
  onSuccess: () => void;
}

function parseFormData(formData: FormData): UpdateStoreDto {
  return {
    name: formData.get('name') as string,
    // ... 나머지 필드
  };
}

export function EditStoreDialog({ store, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);

  const { execute: handleSubmit, isPending } = useAsyncAction(
    async (formData: FormData) => {
      const data = parseFormData(formData);
      return updateStore(store.id, data);
    },
    {
      toast,
      successMessage: '매장이 수정되었습니다.',
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>매장 수정</DialogTitle>
          <DialogDescription>{store.name} 정보를 수정합니다.</DialogDescription>
        </DialogHeader>
        <StoreForm
          store={store}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
```

### Delete Dialog (수동 에러 처리)

```typescript
// apps/<app>/src/components/<feature>/delete-<feature>-dialog.tsx
'use client';

import { useState, type ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from '@repo/ui';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteStore, type Store } from '@/lib/stores';
import { getApiErrorMessage } from '@repo/web-shared';

interface Props {
  store: Store;
  onSuccess: () => void;
}

export function DeleteStoreDialog({ store, onSuccess }: Props): ReactNode {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    setIsPending(true);
    try {
      await deleteStore(store.id);
      toast.success('매장이 삭제되었습니다.');
      setOpen(false);
      onSuccess();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>매장 삭제</DialogTitle>
          <DialogDescription>
            정말 <strong>{store.name}</strong>을(를) 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
            취소
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? '삭제 중...' : '삭제'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Form 컴포넌트

```typescript
// apps/<app>/src/components/<feature>/<feature>-form.tsx
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
        {/* 나머지 필드들 */}
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
```

## 4. Server Component에서 Client Component 사용

```typescript
// apps/<app>/src/app/(dashboard)/<feature>/page.tsx
import type { ReactNode } from 'react';
import { StoresPageClient } from '@/components/stores';

export default function StoresPage(): ReactNode {
  return <StoresPageClient />;
}
```

## Checklist

새 CRUD 기능 구현 시:

- [ ] `lib/types/<feature>.types.ts` - 타입 정의 (Entity, CreateDto, UpdateDto)
- [ ] `lib/types/index.ts` - barrel export 추가
- [ ] `lib/<feature>.ts` - API 함수 (get, getAll, create, update, delete)
- [ ] `lib/index.ts` - barrel export 추가
- [ ] `components/<feature>/<feature>-page-client.tsx` - 메인 클라이언트 컴포넌트
- [ ] `components/<feature>/<feature>-form.tsx` - 폼 컴포넌트
- [ ] `components/<feature>/<feature>-table.tsx` - 테이블 컴포넌트
- [ ] `components/<feature>/create-<feature>-dialog.tsx` - 생성 다이얼로그
- [ ] `components/<feature>/edit-<feature>-dialog.tsx` - 수정 다이얼로그
- [ ] `components/<feature>/delete-<feature>-dialog.tsx` - 삭제 다이얼로그
- [ ] `components/<feature>/index.ts` - barrel export
- [ ] `app/(dashboard)/<feature>/page.tsx` - 페이지 (Server Component)

## 핵심 규칙

1. **타입 분리**: `*.types.ts` 파일에 타입 정의
2. **barrel export**: `index.ts`에서 `export * from './...'` 패턴 사용
3. **useAsyncAction**: Create/Update에서 사용, 자동 에러 처리 + 토스트
4. **getApiErrorMessage**: 수동 에러 처리 시 사용 (Delete, 목록 조회 등)
5. **FormData 사용**: 폼 제출 시 FormData → DTO 변환
6. **onSuccess 콜백**: 성공 시 다이얼로그 닫기 + 목록 새로고침
7. **Server Component 래퍼**: page.tsx는 Server Component로 유지, Client Component를 import
