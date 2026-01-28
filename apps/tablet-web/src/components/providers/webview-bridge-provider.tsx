'use client';

import { useEffect, type ReactNode } from 'react';
import { useWebViewBridge } from '@/hooks/use-webview-bridge';
import { useDeviceStore } from '@/stores';
import { AdminDialog } from '@/components/dialogs';

interface Props {
  children: ReactNode;
  storeId: string;
}

export function WebViewBridgeProvider({ children, storeId }: Props) {
  useWebViewBridge();
  const { isAdminOpen, setIsAdminOpen, setStoreId } = useDeviceStore();

  useEffect(() => {
    if (storeId) {
      setStoreId(storeId);
    }
  }, [storeId, setStoreId]);

  return (
    <>
      {children}
      <AdminDialog open={isAdminOpen} onOpenChange={setIsAdminOpen} storeId={storeId} />
    </>
  );
}
