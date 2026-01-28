import { create } from 'zustand';

interface DeviceState {
  deviceId: string | null;
  storeId: string | null;
  isInWebView: boolean;
  isAdminOpen: boolean;

  setDeviceId: (deviceId: string) => void;
  setStoreId: (storeId: string) => void;
  setIsInWebView: (isInWebView: boolean) => void;
  setIsAdminOpen: (isAdminOpen: boolean) => void;
}

export const useDeviceStore = create<DeviceState>(set => ({
  deviceId: null,
  storeId: null,
  isInWebView: false,
  isAdminOpen: false,

  setDeviceId: deviceId => set({ deviceId }),
  setStoreId: storeId => set({ storeId }),
  setIsInWebView: isInWebView => set({ isInWebView }),
  setIsAdminOpen: isAdminOpen => set({ isAdminOpen }),
}));
