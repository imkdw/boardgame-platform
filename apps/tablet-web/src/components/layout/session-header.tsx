'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@repo/ui';
import { Bell, Clock } from 'lucide-react';
import { LocaleSwitcher, TimeDisplay } from '@/components/shared';
import { useSessionStore } from '@/stores';

interface Props {
  onStaffCall: () => void;
}

function formatEndTime(dateString: string): string {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${String(minutes).padStart(2, '0')}`;
}

export function SessionHeader({ onStaffCall }: Props) {
  const t = useTranslations('SessionHeader');
  const tHome = useTranslations('TabletHome');
  const { session, room, remainingSeconds } = useSessionStore();

  const roomNumber = room?.roomNumber ?? '-';
  const endTime = session?.scheduledEndAt ? formatEndTime(session.scheduledEndAt) : '--:--';

  return (
    <header className={cn('flex items-center justify-between border-b border-border bg-card px-6 py-4')}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <span className="text-lg font-bold text-primary-foreground">W</span>
        </div>
        <span className="text-lg font-semibold text-foreground">{tHome('header.storeName')}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{tHome('header.tableLabel')}:</span>
          <span className="text-lg font-bold text-foreground">{roomNumber}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <TimeDisplay remainingSeconds={remainingSeconds} size="lg" />
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>{t('endTime')}</span>
          <span className="font-medium text-foreground">{endTime}</span>
        </div>

        <button
          onClick={onStaffCall}
          className={cn(
            'flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2',
            'text-sm font-medium text-foreground transition-colors',
            'hover:border-primary hover:text-primary'
          )}
        >
          <Bell className="h-4 w-4" />
          <span>{t('staffCall')}</span>
        </button>

        <LocaleSwitcher />
      </div>
    </header>
  );
}
