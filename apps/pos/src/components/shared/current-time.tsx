import { useEffect, useState } from 'react';
import { formatTime } from '@/lib/format';

export function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <span className="font-mono text-lg font-medium">{formatTime(time)}</span>;
}
