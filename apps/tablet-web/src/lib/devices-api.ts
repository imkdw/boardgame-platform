import type { ApiResponse, StoreDevice, StoreRoom } from '@repo/types';
import { fetchApi } from './api';

interface VerifyPasswordResponse {
  valid: boolean;
}

export async function verifyTabletAdminPassword(storeId: string, password: string): Promise<boolean> {
  const response = await fetchApi<ApiResponse<VerifyPasswordResponse>>(
    `/stores/${storeId}/tablet-admin-password/verify`,
    {
      method: 'POST',
      body: JSON.stringify({ password }),
    }
  );
  return response.data.valid;
}

interface RegisterDeviceParams {
  deviceId: string;
  roomId?: string;
  name?: string;
}

export async function registerDevice(storeId: string, params: RegisterDeviceParams): Promise<StoreDevice> {
  const response = await fetchApi<ApiResponse<StoreDevice>>(`/stores/${storeId}/devices`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return response.data;
}

export async function getStoreRooms(storeId: string): Promise<StoreRoom[]> {
  const response = await fetchApi<ApiResponse<StoreRoom[]>>(`/stores/${storeId}/rooms`);
  return response.data;
}

export async function getDeviceByDeviceId(storeId: string, deviceId: string): Promise<StoreDevice | null> {
  try {
    const response = await fetchApi<ApiResponse<StoreDevice>>(`/stores/${storeId}/devices/by-device-id/${deviceId}`);
    return response.data;
  } catch {
    return null;
  }
}
