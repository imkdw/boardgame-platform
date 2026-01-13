'use client';

import type { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge } from '@repo/ui';
import { Clock, Star } from 'lucide-react';
import type { StoreTimePlan } from '@repo/types';
import { EditStoreTimePlanDialog } from './edit-store-time-plan-dialog';
import { DeleteStoreTimePlanDialog } from './delete-store-time-plan-dialog';

interface Props {
  storeId: string;
  timePlans: StoreTimePlan[];
  onRefresh: () => void;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}분`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}시간`;
  }
  return `${hours}시간 ${remainingMinutes}분`;
}

function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원';
}

export function StoreTimePlanTable({ storeId, timePlans, onRefresh }: Props): ReactNode {
  if (timePlans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Clock className="mb-4 size-12" />
        <p>등록된 시간제 플랜이 없습니다.</p>
        <p className="text-sm">새 플랜을 추가해주세요.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">순서</TableHead>
          <TableHead>플랜 이름</TableHead>
          <TableHead>이용 시간</TableHead>
          <TableHead>가격</TableHead>
          <TableHead>추천</TableHead>
          <TableHead className="w-24 text-center">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {timePlans.map(plan => (
          <TableRow key={plan.id}>
            <TableCell>
              <span className="font-mono text-muted-foreground">{plan.sort}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="size-4 text-primary" />
                </div>
                <span className="font-medium">{plan.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">{formatDuration(plan.durationMinutes)}</span>
            </TableCell>
            <TableCell>
              <span className="font-medium">{formatPrice(plan.price)}</span>
            </TableCell>
            <TableCell>
              {plan.isRecommended ? (
                <Badge variant="default" className="gap-1">
                  <Star className="size-3" />
                  추천
                </Badge>
              ) : (
                <span className="text-sm text-muted-foreground">-</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-1">
                <EditStoreTimePlanDialog
                  storeId={storeId}
                  timePlan={plan}
                  totalPlans={timePlans.length}
                  onSuccess={onRefresh}
                />
                <DeleteStoreTimePlanDialog storeId={storeId} timePlan={plan} onSuccess={onRefresh} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
