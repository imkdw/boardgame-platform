'use client';

import type { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui';
import { Building2, Globe, MapPin, Phone } from 'lucide-react';
import type { Store } from '@repo/types';
import { EditStoreDialog } from './edit-store-dialog';
import { DeleteStoreDialog } from './delete-store-dialog';

interface Props {
  stores: Store[];
  onRefresh: () => void;
}

export function StoreTable({ stores, onRefresh }: Props): ReactNode {
  if (stores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Building2 className="mb-4 size-12" />
        <p>등록된 매장이 없습니다.</p>
        <p className="text-sm">새 매장을 추가해주세요.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>매장명</TableHead>
          <TableHead>주소</TableHead>
          <TableHead>연락처</TableHead>
          <TableHead>IP 주소</TableHead>
          <TableHead>와이파이</TableHead>
          <TableHead className="w-24 text-center">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stores.map(store => (
          <TableRow key={store.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="size-4 text-primary" />
                </div>
                <span className="font-medium">{store.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4 shrink-0" />
                <span className="text-sm">{store.address}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="size-4 shrink-0" />
                <span className="text-sm">{store.contact}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="size-4 shrink-0" />
                <span className="text-sm font-mono">{store.ip}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm text-muted-foreground">{store.wifiName}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-1">
                <EditStoreDialog store={store} onSuccess={onRefresh} />
                <DeleteStoreDialog store={store} onSuccess={onRefresh} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
