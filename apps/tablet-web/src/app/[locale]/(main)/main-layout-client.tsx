'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { SessionLayout, TabletHeader } from '@/components/layout';
import { LocaleSwitcher } from '@/components/shared';
import { SessionProvider } from '@/components/providers';
import { useSessionStore } from '@/stores';

interface Props {
  children: ReactNode;
  storeId: string;
  roomId: string;
  storeName: string;
}

export function MainLayoutClient({ children, storeId, roomId, storeName }: Props) {
  return (
    <SessionProvider storeId={storeId} roomId={roomId}>
      <MainLayoutContent storeName={storeName}>{children}</MainLayoutContent>
    </SessionProvider>
  );
}

interface ContentProps {
  children: ReactNode;
  storeName: string;
}

function MainLayoutContent({ children, storeName }: ContentProps) {
  const t = useTranslations('TabletHome');
  const { isActive, room } = useSessionStore();

  if (isActive) {
    return <SessionLayout>{children}</SessionLayout>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TabletHeader
        storeName={storeName}
        tableLabel={t('header.tableLabel')}
        tableNumber={room ? room.roomNumber.toString() : t('tableInfo.tableNumber')}
        languageSwitcher={<LocaleSwitcher />}
      />
      {children}
    </div>
  );
}
