import type { ReactNode } from 'react';

import { TabletHomeContent } from '@/features/home';
import { findStoreByIp } from '@/lib/stores-api';

export default async function TabletHomePage(): Promise<ReactNode> {
  // TODO: 임시 IP 제거 - 실제 클라이언트 IP를 사용하도록 변경 필요
  const store = await findStoreByIp('1.1.1.1');

  return <TabletHomeContent store={store} />;
}
