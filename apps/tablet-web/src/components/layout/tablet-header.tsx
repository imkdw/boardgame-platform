'use client';

import type { ReactNode } from 'react';
import { cn } from '@repo/ui';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';

interface Props {
  storeName: string;
  tableLabel: string;
  tableNumber: string;
  languageSwitcher: ReactNode;
  showBackButton?: boolean;
}

export function TabletHeader({
  storeName,
  tableLabel,
  tableNumber,
  languageSwitcher,
  showBackButton = true,
}: Props) {
  const router = useRouter();

  return (
    <header className={cn('sticky top-0 z-50 flex items-center justify-between border-b border-border bg-card px-6 py-4')}>
      <div className="flex items-center gap-3">
        {showBackButton && (
          <button
            onClick={() => router.push('/')}
            className={cn(
              'flex items-center justify-center rounded-lg p-2',
              'text-foreground transition-colors',
              'hover:bg-accent hover:text-accent-foreground'
            )}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
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
