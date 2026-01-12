import type { ReactNode } from 'react';

import { TabletHomeContent } from '@/features/home';
import { getStoreByIp } from '@/lib/stores-api';

export default async function TabletHomePage(): Promise<ReactNode> {
  const store = await getStoreByIp('1.1.1.1');

  return <TabletHomeContent store={store} />;
}
