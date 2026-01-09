import { useEffect, useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

interface UseIdleTimerOptions {
  timeout?: number;
  onIdle?: () => void;
  redirectTo?: string;
  disabled?: boolean;
}

export function useIdleTimer({
  timeout = 30000,
  onIdle,
  redirectTo = '/',
  disabled = false,
}: UseIdleTimerOptions = {}) {
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const resetTimer = useCallback(() => {
    if (disabled) return;

    setShowWarning(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setShowWarning(true);
    }, timeout);
  }, [timeout, disabled]);

  const handleIdle = useCallback(() => {
    setShowWarning(false);
    onIdle?.();
    navigate(redirectTo);
  }, [onIdle, navigate, redirectTo]);

  const dismissWarning = useCallback(() => {
    setShowWarning(false);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    if (disabled) return;

    const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'];

    const handleActivity = () => resetTimer();

    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    resetTimer();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetTimer, disabled]);

  return { showWarning, dismissWarning, handleIdle };
}
