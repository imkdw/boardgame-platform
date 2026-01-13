import { useState, useEffect } from 'react';
import type { ApiResponse } from '@repo/types';
import { fetchApi } from '../lib/api';
import type { TimePlan, TimePackage } from '../types/kiosk';
import { timePlanToTimePackage } from '../types/kiosk';

interface UseTimePlansResult {
  timePlans: TimePackage[];
  isLoading: boolean;
  error: Error | null;
}

export function useTimePlans(storeId: string | null): UseTimePlansResult {
  const [timePlans, setTimePlans] = useState<TimePackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!storeId) {
      setIsLoading(false);
      return;
    }

    const fetchTimePlans = async () => {
      try {
        setIsLoading(true);
        const response = await fetchApi<ApiResponse<TimePlan[]>>(`/stores/${storeId}/time-plans`);
        const packages = response.data.map(timePlanToTimePackage);
        setTimePlans(packages);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch time plans'));
        setTimePlans([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimePlans();
  }, [storeId]);

  return { timePlans, isLoading, error };
}
