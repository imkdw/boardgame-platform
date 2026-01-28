'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { SessionLayout, TabletHeader } from '@/components/layout';
import { LocaleSwitcher } from '@/components/shared';
import { SessionProvider, WebViewBridgeProvider } from '@/components/providers';
import { useSessionStore } from '@/stores';

interface Props {
  children: ReactNode;
  storeId: string;
  roomId: string;
  storeName: string;
}

export function MainLayoutClient({ children, storeId, roomId, storeName }: Props) {
  return (
    <WebViewBridgeProvider storeId={storeId}>
      <SessionProvider storeId={storeId} roomId={roomId}>
        <MainLayoutContent storeName={storeName}>{children}</MainLayoutContent>
      </SessionProvider>
    </WebViewBridgeProvider>
  );
}

interface ContentProps {
  children: ReactNode;
  storeName: string;
}

function MainLayoutContent({ children, storeName }: ContentProps) {
  const t = useTranslations('TabletHome');
  const pathname = usePathname();
  const { isActive, room } = useSessionStore();

  // 메인 페이지인지 확인 (/, /ko, /en, /ja 등)
  const isHomePage = /^\/[a-z]{2}$/.test(pathname) || pathname === '/';
  // 비디오 페이지인지 확인 (헤더 숨김)
  const isVideoPage = pathname.endsWith('/video');

  if (isActive) {
    return <SessionLayout>{children}</SessionLayout>;
  }

  // 비디오 페이지에서는 헤더 없이 렌더링
  if (isVideoPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TabletHeader
        storeName={storeName}
        tableLabel={t('header.tableLabel')}
        tableNumber={room ? room.roomNumber.toString() : t('tableInfo.tableNumber')}
        languageSwitcher={<LocaleSwitcher />}
        showBackButton={!isHomePage}
      />
      {children}
    </div>
  );
}
