'use client';

import { useEffect, useCallback } from 'react';
import { BRIDGE_MESSAGE_TYPE } from '@repo/consts';
import { useDeviceStore } from '@/stores';

interface BridgeMessage<T = unknown> {
  type: string;
  data: T;
}

interface RnInitData {
  deviceId: string;
  appVersion: string;
}

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export function useWebViewBridge() {
  const { setDeviceId, setIsInWebView, setIsAdminOpen } = useDeviceStore();

  const sendToRN = useCallback((type: string, data: unknown = {}) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type, data }));
    }
  }, []);

  useEffect(() => {
    const isInWebView = !!window.ReactNativeWebView;
    setIsInWebView(isInWebView);

    if (!isInWebView) return;

    const handleMessage = (event: CustomEvent<BridgeMessage>) => {
      const { type, data } = event.detail;

      switch (type) {
        case BRIDGE_MESSAGE_TYPE.RN_INIT: {
          const initData = data as RnInitData;
          setDeviceId(initData.deviceId);
          break;
        }
        case BRIDGE_MESSAGE_TYPE.RN_DEVICE_INFO: {
          const deviceData = data as { deviceId: string };
          setDeviceId(deviceData.deviceId);
          break;
        }
        case BRIDGE_MESSAGE_TYPE.RN_OPEN_ADMIN:
          setIsAdminOpen(true);
          break;
      }
    };

    window.addEventListener('fromRN', handleMessage as EventListener);

    sendToRN(BRIDGE_MESSAGE_TYPE.WEB_READY, { url: window.location.href });

    return () => {
      window.removeEventListener('fromRN', handleMessage as EventListener);
    };
  }, [setDeviceId, setIsInWebView, setIsAdminOpen, sendToRN]);

  return { sendToRN };
}
