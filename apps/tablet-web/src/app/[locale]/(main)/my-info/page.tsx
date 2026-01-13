'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Clock, CreditCard, Timer, LogOut, Ticket } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Progress, Separator } from '@repo/ui';
import { TimeDisplay } from '@/components/shared';
import { ExtendTimeDialog, ExitConfirmDialog } from '@/components/dialogs';
import { useSessionStore } from '@/stores';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function MyInfoActiveContent() {
  const t = useTranslations('MyInfo');
  const [extendDialogOpen, setExtendDialogOpen] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const { session, remainingSeconds } = useSessionStore();

  if (!session) return null;

  const totalPayment = session.totalPrice;
  const durationMinutes = session.timePlan?.durationMinutes ?? 0;
  const totalSeconds = durationMinutes * 60;
  const elapsedSeconds = totalSeconds - remainingSeconds;
  const progressValue = totalSeconds > 0 ? Math.round((elapsedSeconds / totalSeconds) * 100) : 0;

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t('timeInfo.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{t('timeInfo.startTime')}</p>
              <p className="text-lg font-medium">{formatTime(session.startedAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('timeInfo.purchasedTime')}</p>
              <p className="text-lg font-medium">
                {session.timePlan?.name ?? t('timeInfo.hoursUnit', { hours: Math.floor(durationMinutes / 60) })}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-muted/50 p-6 text-center">
            <p className="mb-2 text-sm text-muted-foreground">{t('timeInfo.remainingTime')}</p>
            <TimeDisplay remainingSeconds={remainingSeconds} size="lg" />
          </div>

          <div className="space-y-2">
            <Progress value={progressValue} className="h-3" />
            <p className="text-right text-xs text-muted-foreground">{progressValue}%</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{t('timeInfo.endTime')}</p>
            <p className="text-lg font-semibold">{formatTime(session.scheduledEndAt)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {t('paymentInfo.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('paymentInfo.initialPayment')}</span>
            <span>
              {formatCurrency(totalPayment)}
              {t('paymentInfo.currency')}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-semibold">
            <span>{t('paymentInfo.totalPayment')}</span>
            <span className="text-primary">
              {formatCurrency(totalPayment)}
              {t('paymentInfo.currency')}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="mt-auto grid grid-cols-2 gap-4">
        <Button size="touch-lg" onClick={() => setExtendDialogOpen(true)}>
          <Timer className="mr-2 h-5 w-5" />
          {t('actions.extend')}
        </Button>
        <Button variant="outline" size="touch-lg" onClick={() => setExitDialogOpen(true)}>
          <LogOut className="mr-2 h-5 w-5" />
          {t('actions.exit')}
        </Button>
      </div>

      <ExtendTimeDialog open={extendDialogOpen} onOpenChange={setExtendDialogOpen} />
      <ExitConfirmDialog open={exitDialogOpen} onOpenChange={setExitDialogOpen} />
    </div>
  );
}

function MyInfoEmptyContent() {
  const t = useTranslations('MyInfo');

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Ticket className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">{t('empty.title')}</h1>
      <p className="text-center text-muted-foreground">{t('empty.description')}</p>
    </div>
  );
}

export default function MyInfoPage() {
  const { isActive } = useSessionStore();
  return isActive ? <MyInfoActiveContent /> : <MyInfoEmptyContent />;
}
