import type { ReactNode } from 'react';
import { findStoreByIp } from '@/lib/stores-api';
import { getRooms } from '@/lib/session-api';
import { MainLayoutClient } from './main-layout-client';

interface Props {
  children: ReactNode;
}

export default async function MainLayout({ children }: Props) {
  // TODO: 임시 IP 제거 - 실제 클라이언트 IP를 사용하도록 변경 필요
  const store = await findStoreByIp('1.1.1.1');
  const rooms = await getRooms(store.id);

  // 태블릿에 할당된 방 (첫 번째 방 사용 - 추후 설정으로 변경 가능)
  const assignedRoom = rooms[0];

  return (
    <MainLayoutClient storeId={store.id} roomId={assignedRoom?.id ?? ''} storeName={store.name}>
      {children}
    </MainLayoutClient>
  );
}
