import type { ReactNode } from 'react';
import { cn } from '@repo/ui';

interface TabletHeaderProps {
  storeName: string;
  tableLabel: string;
  tableNumber: string;
  languageSwitcher: ReactNode;
}

export function TabletHeader({ storeName, tableLabel, tableNumber, languageSwitcher }: TabletHeaderProps) {
  return (
    <header className={cn('flex items-center justify-between border-b border-border bg-card px-6 py-4')}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <span className="text-lg font-bold text-primary-foreground">W</span>
        </div>
        <span className="text-lg font-semibold text-foreground">{storeName}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <span className="text-sm text-muted-foreground">{tableLabel}:</span>
          <span className="ml-2 text-lg font-bold text-foreground">{tableNumber}</span>
        </div>
        {languageSwitcher}
      </div>
    </header>
  );
}
