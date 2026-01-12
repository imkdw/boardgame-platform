import type { ReactNode } from 'react';
import { SessionLayout } from '@/components/layout';
import { MOCK_SESSION } from '@/lib/mock-session';

interface Props {
  children: ReactNode;
}

export default async function MainLayout({ children }: Props) {
  if (MOCK_SESSION.isActive) {
    return <SessionLayout>{children}</SessionLayout>;
  }

  return <DisabledSessionLayout>{children}</DisabledSessionLayout>;
}

async function DisabledSessionLayout({ children }: { children: ReactNode }) {
  const { TabletHeader } = await import('@/components/layout');
  const { LocaleSwitcher } = await import('@/components/shared');
  const { getTranslations } = await import('next-intl/server');
  const { getStoreByIp } = await import('@/lib/stores-api');

  const t = await getTranslations('TabletHome');
  const store = await getStoreByIp('1.1.1.1');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TabletHeader
        storeName={store.name}
        tableLabel={t('header.tableLabel')}
        tableNumber={t('tableInfo.tableNumber')}
        languageSwitcher={<LocaleSwitcher />}
      />
      {children}
    </div>
  );
}
