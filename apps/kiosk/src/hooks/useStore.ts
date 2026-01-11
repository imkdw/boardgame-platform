import { useState, useEffect } from 'react';
import type { Store } from '@repo/types';
import { fetchApi } from '../lib/api';

interface UseStoreResult {
  store: Store | null;
  isLoading: boolean;
  error: Error | null;
}

export function useStore(): UseStoreResult {
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setIsLoading(true);
        const data = await fetchApi<Store>('/stores/ip');
        setStore(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch store'));
        setStore(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStore();
  }, []);

  return { store, isLoading, error };
}
