'use client';

import { cn } from '@repo/ui';
import { useTimeStatus, type TimeStatus } from '@/hooks/use-time-status';

interface Props {
  remainingSeconds: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg font-semibold',
};

const statusStyles: Record<TimeStatus, string> = {
  normal: 'text-foreground',
  warning: 'text-status-warning',
  danger: 'text-status-error animate-pulse',
};

export function TimeDisplay({ remainingSeconds, size = 'md' }: Props) {
  const { status, formattedTime } = useTimeStatus(remainingSeconds);

  return <span className={cn('tabular-nums', sizeStyles[size], statusStyles[status])}>{formattedTime}</span>;
}
