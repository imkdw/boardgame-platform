'use client';

import type { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui';
import { UtensilsCrossed } from 'lucide-react';
import type { FoodCategory } from '@repo/types';
import { EditFoodCategoryDialog } from './edit-food-category-dialog';
import { DeleteFoodCategoryDialog } from './delete-food-category-dialog';

interface Props {
  storeId: string;
  categories: FoodCategory[];
  onRefresh: () => void;
}

export function FoodCategoryTable({ storeId, categories, onRefresh }: Props): ReactNode {
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <UtensilsCrossed className="mb-4 size-12" />
        <p>등록된 카테고리가 없습니다.</p>
        <p className="text-sm">새 카테고리를 추가해주세요.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>카테고리명</TableHead>
          <TableHead className="w-24 text-center">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map(category => (
          <TableRow key={category.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                  <UtensilsCrossed className="size-4 text-primary" />
                </div>
                <span className="font-medium">{category.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-1">
                <EditFoodCategoryDialog storeId={storeId} category={category} onSuccess={onRefresh} />
                <DeleteFoodCategoryDialog storeId={storeId} category={category} onSuccess={onRefresh} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
