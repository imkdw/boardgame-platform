'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Clock, CreditCard, Timer, LogOut, Ticket, Users, MapPin, CalendarClock, Sparkles } from 'lucide-react';
import { Card, CardContent, Button, cn } from '@repo/ui';
import { ExtendTimeDialog, ExitConfirmDialog } from '@/components/dialogs';
import { useSessionStore } from '@/stores';
import { useTimeStatus } from '@/hooks/use-time-status';

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

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  iconBgClass?: string;
}

function InfoItem({ icon, label, value, iconBgClass = 'bg-primary/10 text-primary' }: InfoItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', iconBgClass)}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="text-lg font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
}

function MyInfoActiveContent() {
  const t = useTranslations('MyInfo');
  const [extendDialogOpen, setExtendDialogOpen] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const { session, room, remainingSeconds } = useSessionStore();
  const { formattedTime } = useTimeStatus(remainingSeconds);

  if (!session) return null;
  const totalPayment = session.totalPrice;
  const durationMinutes = session.timePlan?.durationMinutes ?? 0;
  const totalSeconds = durationMinutes * 60;
  // 경과 시간 비율 계산 (0~100%) - 시간이 지나면 채워짐
  const elapsedPercent =
    totalSeconds > 0 ? Math.min(100, Math.max(0, ((totalSeconds - remainingSeconds) / totalSeconds) * 100)) : 0;

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden p-5">
      {/* Hero Section - Large Time Display */}
      <Card className="shrink-0 border-0 bg-primary">
        <CardContent className="flex flex-col items-center py-6">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-white/80" />
            <span className="text-sm font-medium text-white/80">{t('timeInfo.remainingTime')}</span>
          </div>
          <div className="mb-4 text-5xl font-bold tabular-nums text-white">{formattedTime}</div>
          <div className="w-full max-w-md px-4">
            <div className="mb-2 h-3 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all duration-1000 ease-linear"
                style={{ width: `${elapsedPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-white/80">
              <span>
                {t('timeInfo.startTime')}: {formatTime(session.startedAt)}
              </span>
              <span>
                {t('timeInfo.endTime')}: {formatTime(session.scheduledEndAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Cards Grid */}
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
        {/* Session Info Card */}
        <Card className="min-h-0 border-0 shadow-sm">
          <CardContent className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              {t('timeInfo.title')}
            </div>
            <div className="space-y-4">
              <InfoItem
                icon={<MapPin className="h-5 w-5" />}
                label={t('timeInfo.roomNumber')}
                value={room ? t('timeInfo.roomNumberUnit', { number: room.roomNumber }) : '-'}
              />
              <InfoItem
                icon={<Users className="h-5 w-5" />}
                label={t('timeInfo.peopleCount')}
                value={t('timeInfo.peopleCountUnit', { count: session.peopleCount })}
                iconBgClass="bg-status-complete/10 text-status-complete"
              />
              <InfoItem
                icon={<CalendarClock className="h-5 w-5" />}
                label={t('timeInfo.purchasedTime')}
                value={session.timePlan?.name ?? t('timeInfo.hoursUnit', { hours: Math.floor(durationMinutes / 60) })}
                iconBgClass="bg-status-progress/10 text-status-progress"
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Card */}
        <Card className="min-h-0 border-0 shadow-sm">
          <CardContent className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CreditCard className="h-4 w-4 text-primary" />
              {t('paymentInfo.title')}
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="mb-1 text-sm text-muted-foreground">{t('paymentInfo.initialPayment')}</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(totalPayment)}
                  <span className="ml-0.5 text-base font-normal text-muted-foreground">
                    {t('paymentInfo.currency')}
                  </span>
                </p>
              </div>
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4">
                <p className="mb-1 text-sm text-muted-foreground">{t('paymentInfo.totalPayment')}</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(totalPayment)}
                  <span className="ml-0.5 text-base font-normal text-primary/70">{t('paymentInfo.currency')}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid shrink-0 grid-cols-2 gap-4">
        <Button
          size="touch-lg"
          onClick={() => setExtendDialogOpen(true)}
          className="h-16 rounded-2xl text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Timer className="mr-2 h-6 w-6" />
          {t('actions.extend')}
        </Button>
        <Button
          variant="outline"
          size="touch-lg"
          onClick={() => setExitDialogOpen(true)}
          className="h-16 rounded-2xl text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <LogOut className="mr-2 h-6 w-6" />
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
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <Ticket className="h-12 w-12 text-muted-foreground" />
      </div>
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold text-foreground">{t('empty.title')}</h1>
        <p className="text-lg text-muted-foreground">{t('empty.description')}</p>
      </div>
    </div>
  );
}

export default function MyInfoPage() {
  const { isActive } = useSessionStore();
  return isActive ? <MyInfoActiveContent /> : <MyInfoEmptyContent />;
}
