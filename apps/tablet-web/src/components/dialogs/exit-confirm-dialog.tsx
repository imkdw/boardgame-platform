'use client';

import { useTranslations } from 'next-intl';
import { LogOut, CheckCircle } from 'lucide-react';
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
import { MOCK_SESSION } from '@/lib/mock-session';

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

function formatUsageTime(startTime: Date): string {
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

  const totalExtensionPayment = MOCK_SESSION.extensionPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPayment = MOCK_SESSION.initialPayment + totalExtensionPayment;

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    handleClose();
  };

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
              <span className="font-medium">{formatUsageTime(MOCK_SESSION.startTime)}</span>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="mb-3 text-sm font-medium">{t('paymentSummary')}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t('initialPayment')}</span>
                <span>
                  {formatCurrency(MOCK_SESSION.initialPayment)}
                  {t('currency')}
                </span>
              </div>
              {totalExtensionPayment > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('extensionPayment')}</span>
                  <span>
                    {formatCurrency(totalExtensionPayment)}
                    {t('currency')}
                  </span>
                </div>
              )}
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
          <Button variant="secondary" onClick={handleClose} size="touch" className="flex-1">
            {t('cancel')}
          </Button>
          <Button onClick={handleConfirm} size="touch" className="flex-1">
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
