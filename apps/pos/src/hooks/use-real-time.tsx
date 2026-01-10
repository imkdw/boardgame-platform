import { useEffect, useState } from 'react';

/**
 * 실시간 시간 업데이트 훅
 * @param intervalMs 업데이트 간격 (기본: 1000ms)
 */
export function useRealTime(intervalMs = 1000): Date {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return currentTime;
}
