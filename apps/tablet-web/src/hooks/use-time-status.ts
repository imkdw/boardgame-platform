export type TimeStatus = 'normal' | 'warning' | 'danger';

interface UseTimeStatusReturn {
  status: TimeStatus;
  formattedTime: string;
  minutes: number;
}

export function useTimeStatus(remainingSeconds: number): UseTimeStatusReturn {
  const minutes = Math.floor(remainingSeconds / 60);

  const status: TimeStatus = minutes <= 10 ? 'danger' : minutes <= 30 ? 'warning' : 'normal';

  const hours = Math.floor(remainingSeconds / 3600);
  const mins = Math.floor((remainingSeconds % 3600) / 60);
  const secs = remainingSeconds % 60;

  const formattedTime =
    hours > 0
      ? `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
      : `${mins}:${String(secs).padStart(2, '0')}`;

  return { status, formattedTime, minutes };
}
