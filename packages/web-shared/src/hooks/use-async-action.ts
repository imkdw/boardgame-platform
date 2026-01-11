'use client';

import { useState, useCallback, useRef } from 'react';
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

  // Use refs to store the latest callbacks to keep execute stable
  const actionRef = useRef(action);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const successMessageRef = useRef(successMessage);
  const showErrorToastRef = useRef(showErrorToast);

  // Update refs on each render
  actionRef.current = action;
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;
  successMessageRef.current = successMessage;
  showErrorToastRef.current = showErrorToast;

  const execute = useCallback(
    async (...args: TArgs): Promise<TResult | undefined> => {
      setIsPending(true);
      try {
        const result = await actionRef.current(...args);
        if (successMessageRef.current) {
          toast.success(successMessageRef.current);
        }
        onSuccessRef.current?.(result);
        return result;
      } catch (error) {
        if (showErrorToastRef.current) {
          toast.error(getApiErrorMessage(error));
        }
        onErrorRef.current?.(error);
        return undefined;
      } finally {
        setIsPending(false);
      }
    },
    [toast]
  );

  return { execute, isPending };
}
