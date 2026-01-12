import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';

import { TabletHeader } from '@/components/layout';
import { LocaleSwitcher } from '@/components/shared';
import { TabletHomeContent } from '@/features/home';
import { MOCK_SESSION } from '@/lib/mock-session';
import { getStoreByIp } from '@/lib/stores-api';

export default async function TabletHomePage(): Promise<ReactNode> {
  const t = await getTranslations('TabletHome');
  const store = await getStoreByIp('1.1.1.1');

  const content = <TabletHomeContent store={store} />;

  if (MOCK_SESSION.isActive) {
    return content;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TabletHeader
        storeName={store.name}
        tableLabel={t('header.tableLabel')}
        tableNumber={t('tableInfo.tableNumber')}
        languageSwitcher={<LocaleSwitcher />}
      />
      {content}
    </div>
  );
}
