import type { ReactNode } from 'react';
import { cn } from '@repo/ui';

interface Props {
  title: string;
  subtitle: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function QuickActionCard({ title, subtitle, icon, onClick, className }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4',
        'hover:bg-muted active:bg-muted/80',
        'text-left',
        className
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-primary">{icon}</div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-card-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </button>
  );
}
