'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LogOut, CheckCircle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Separator,
} from '@repo/ui';
import { useSessionStore } from '@/stores';
import { endSession } from '@/lib/session-api';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatUsageTime(startTimeStr: string): string {
  const startTime = new Date(startTimeStr);
  const now = new Date();
  const diffMs = now.getTime() - startTime.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;

  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function ExitConfirmDialog({ open, onOpenChange, onConfirm }: Props) {
  const t = useTranslations('MyInfo.exitDialog');
  const { session, endSession: endSessionStore } = useSessionStore();
  const [isLoading, setIsLoading] = useState(false);

  const totalPayment = session?.totalPrice ?? 0;

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  const handleConfirm = async () => {
    if (!session) return;

    setIsLoading(true);
    try {
      await endSession(session.storeId, session.roomId, session.id);
      endSessionStore();
      onConfirm?.();
      handleClose();
    } catch {
      // 에러 처리 - 토스트 메시지 등 추가 가능
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent showCloseButton={false} className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription className="text-base">{t('confirmMessage')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="mb-3 text-sm font-medium">{t('usageSummary')}</p>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t('totalUsageTime')}</span>
              <span className="font-medium">{formatUsageTime(session.startedAt)}</span>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="mb-3 text-sm font-medium">{t('paymentSummary')}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t('initialPayment')}</span>
                <span>
                  {formatCurrency(totalPayment)}
                  {t('currency')}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between font-semibold">
                <span>{t('totalPayment')}</span>
                <span className="text-primary">
                  {formatCurrency(totalPayment)}
                  {t('currency')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-status-complete/10 p-3 text-status-complete">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <div>
              <p className="text-sm font-medium">{t('alreadyPaid')}</p>
              <p className="text-xs opacity-80">{t('noAdditionalPayment')}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-3 sm:gap-3">
          <Button variant="secondary" onClick={handleClose} size="touch" className="flex-1" disabled={isLoading}>
            {t('cancel')}
          </Button>
          <Button onClick={handleConfirm} size="touch" className="flex-1" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
