import { useCallback, useRef } from 'react';

const REQUIRED_TAPS = 7;
const TAP_TIMEOUT_MS = 2000;

export function useEasterEgg(onTrigger: () => void) {
  const tapCountRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTap = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    tapCountRef.current += 1;
    // eslint-disable-next-line no-console
    console.log('Easter egg tap:', tapCountRef.current);

    if (tapCountRef.current >= REQUIRED_TAPS) {
      tapCountRef.current = 0;
      onTrigger();
      return;
    }

    timeoutRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, TAP_TIMEOUT_MS);
  }, [onTrigger]);

  return { handleTap };
}
