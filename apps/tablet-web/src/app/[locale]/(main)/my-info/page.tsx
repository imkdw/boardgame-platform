'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Clock, CreditCard, Timer, LogOut, Ticket } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Progress, Separator } from '@repo/ui';
import { TimeDisplay } from '@/components/shared';
import { ExtendTimeDialog, ExitConfirmDialog } from '@/components/dialogs';
import { MOCK_SESSION } from '@/lib/mock-session';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatTime(date: Date): string {
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function MyInfoActiveContent() {
  const t = useTranslations('MyInfo');
  const [extendDialogOpen, setExtendDialogOpen] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);

  const totalPayment =
    MOCK_SESSION.initialPayment + MOCK_SESSION.extensionPayments.reduce((sum, p) => sum + p.amount, 0);

  const elapsedSeconds = MOCK_SESSION.purchasedMinutes * 60 - MOCK_SESSION.remainingSeconds;
  const progressValue = Math.round((elapsedSeconds / (MOCK_SESSION.purchasedMinutes * 60)) * 100);

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
              <p className="text-lg font-medium">{formatTime(MOCK_SESSION.startTime)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('timeInfo.purchasedTime')}</p>
              <p className="text-lg font-medium">
                {t('timeInfo.hoursUnit', { hours: Math.floor(MOCK_SESSION.purchasedMinutes / 60) })}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-muted/50 p-6 text-center">
            <p className="mb-2 text-sm text-muted-foreground">{t('timeInfo.remainingTime')}</p>
            <TimeDisplay remainingSeconds={MOCK_SESSION.remainingSeconds} size="lg" />
          </div>

          <div className="space-y-2">
            <Progress value={progressValue} className="h-3" />
            <p className="text-right text-xs text-muted-foreground">{progressValue}%</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{t('timeInfo.endTime')}</p>
            <p className="text-lg font-semibold">{formatTime(MOCK_SESSION.endTime)}</p>
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
              {formatCurrency(MOCK_SESSION.initialPayment)}
              {t('paymentInfo.currency')}
            </span>
          </div>

          {MOCK_SESSION.extensionPayments.map((payment, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-muted-foreground">
                {t('paymentInfo.extensionItem', { minutes: payment.minutes })}
              </span>
              <span>
                {formatCurrency(payment.amount)}
                {t('paymentInfo.currency')}
              </span>
            </div>
          ))}

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
  return MOCK_SESSION.isActive ? <MyInfoActiveContent /> : <MyInfoEmptyContent />;
}
