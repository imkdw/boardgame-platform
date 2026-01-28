import * as SecureStore from 'expo-secure-store';
import { getRandomValues } from 'expo-crypto';
import { v4 as uuidv4 } from 'uuid';

const DEVICE_ID_KEY = 'bgp_device_id';

function generateUUID(): string {
  const random = new Uint8Array(16);
  getRandomValues(random);
  return uuidv4({ random });
}

export const DeviceIdService = {
  /**
   * Get or create persistent device ID
   * Creates a new UUID if none exists, otherwise returns stored value
   */
  async getDeviceId(): Promise<string> {
    const storedId = await SecureStore.getItemAsync(DEVICE_ID_KEY);

    if (storedId) {
      return storedId;
    }

    const newId = generateUUID();
    await SecureStore.setItemAsync(DEVICE_ID_KEY, newId);
    return newId;
  },

  /**
   * Reset device ID (for testing/admin purposes)
   */
  async resetDeviceId(): Promise<string> {
    await SecureStore.deleteItemAsync(DEVICE_ID_KEY);
    return this.getDeviceId();
  },
};
