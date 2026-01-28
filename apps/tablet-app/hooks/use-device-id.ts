import { useState, useEffect } from 'react';
import { DeviceIdService } from '../services/device-id.service';

export function useDeviceId() {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DeviceIdService.getDeviceId()
      .then(setDeviceId)
      .finally(() => setIsLoading(false));
  }, []);

  return { deviceId, isLoading };
}
