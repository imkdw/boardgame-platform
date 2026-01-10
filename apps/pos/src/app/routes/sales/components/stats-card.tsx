import { cn } from '@repo/ui';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  title: string;
  value: string;
  diff: number;
  diffLabel?: string;
}

export function StatsCard({ title, value, diff, diffLabel = '전일 대비' }: Props) {
  const isPositive = diff >= 0;

  return (
    <div className="rounded-xl border bg-card p-5">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
      <div className="mt-2 flex items-center gap-1.5">
        {isPositive ? (
          <TrendingUp className="size-4 text-emerald-500" />
        ) : (
          <TrendingDown className="size-4 text-rose-500" />
        )}
        <span
          className={cn('text-sm font-medium', isPositive ? 'text-emerald-500' : 'text-rose-500')}
        >
          {isPositive ? '+' : ''}
          {diff.toFixed(1)}%
        </span>
        <span className="text-sm text-muted-foreground">{diffLabel}</span>
      </div>
    </div>
  );
}
