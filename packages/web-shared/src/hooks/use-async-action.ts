'use client';

import { useState, useCallback } from 'react';
import { getApiErrorMessage } from '../get-api-error-message';

interface Toast {
  success: (message: string) => void;
  error: (message: string) => void;
}

interface UseAsyncActionOptions<T> {
  toast: Toast;
  onSuccess?: (result: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  showErrorToast?: boolean;
}

interface UseAsyncActionReturn<TArgs extends unknown[], TResult> {
  execute: (...args: TArgs) => Promise<TResult | undefined>;
  isPending: boolean;
}

export function useAsyncAction<TArgs extends unknown[], TResult>(
  action: (...args: TArgs) => Promise<TResult>,
  options: UseAsyncActionOptions<TResult>
): UseAsyncActionReturn<TArgs, TResult> {
  const { toast, onSuccess, onError, successMessage, showErrorToast = true } = options;
  const [isPending, setIsPending] = useState(false);

  const execute = useCallback(
    async (...args: TArgs): Promise<TResult | undefined> => {
      setIsPending(true);
      try {
        const result = await action(...args);
        if (successMessage) {
          toast.success(successMessage);
        }
        onSuccess?.(result);
        return result;
      } catch (error) {
        if (showErrorToast) {
          toast.error(getApiErrorMessage(error));
        }
        onError?.(error);
        return undefined;
      } finally {
        setIsPending(false);
      }
    },
    [action, toast, onSuccess, onError, successMessage, showErrorToast]
  );

  return { execute, isPending };
}
