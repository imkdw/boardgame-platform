'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Clock, CreditCard, Wallet, Smartphone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button, Separator, cn } from '@repo/ui';
import { TimeDisplay } from '@/components/shared';
import { MOCK_SESSION } from '@/lib/mock-session';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ExtensionOption = '30min' | '1hour' | 'unlimited';
type PaymentMethod = 'kakao' | 'naver' | 'card';

const EXTENSION_PRICES: Record<ExtensionOption, number> = {
  '30min': 2000,
  '1hour': 4000,
  unlimited: 5000,
};

const EXTENSION_MINUTES: Record<ExtensionOption, number | null> = {
  '30min': 30,
  '1hour': 60,
  unlimited: null,
};

function formatTime(date: Date): string {
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ExtendTimeDialog({ open, onOpenChange }: Props) {
  const t = useTranslations('MyInfo.extendDialog');
  const [selectedOption, setSelectedOption] = useState<ExtensionOption | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSelectedOption(null);
      setSelectedPayment(null);
    }, 300);
  };

  const handleConfirm = () => {
    handleClose();
  };

  const getNewEndTime = (): string => {
    if (!selectedOption || selectedOption === 'unlimited') {
      return selectedOption === 'unlimited' ? '-' : formatTime(MOCK_SESSION.endTime);
    }
    const minutes = EXTENSION_MINUTES[selectedOption];
    if (minutes === null) return '-';
    const newEnd = new Date(MOCK_SESSION.endTime.getTime() + minutes * 60 * 1000);
    return formatTime(newEnd);
  };

  const extensionOptions: { key: ExtensionOption; label: string; price: number }[] = [
    { key: '30min', label: t('option30min'), price: EXTENSION_PRICES['30min'] },
    { key: '1hour', label: t('option1hour'), price: EXTENSION_PRICES['1hour'] },
    { key: 'unlimited', label: t('optionUnlimited'), price: EXTENSION_PRICES['unlimited'] },
  ];

  const paymentMethods: { key: PaymentMethod; label: string; icon: React.ReactNode }[] = [
    { key: 'kakao', label: t('paymentKakao'), icon: <Smartphone className="h-5 w-5" /> },
    { key: 'naver', label: t('paymentNaver'), icon: <Wallet className="h-5 w-5" /> },
    { key: 'card', label: t('paymentCard'), icon: <CreditCard className="h-5 w-5" /> },
  ];

  const canConfirm = selectedOption !== null && selectedPayment !== null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent showCloseButton={false} className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="mb-2 text-sm font-medium text-muted-foreground">{t('currentStatus')}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">{t('remainingTime')}</p>
                <TimeDisplay remainingSeconds={MOCK_SESSION.remainingSeconds} size="md" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('endTime')}</p>
                <p className="text-base font-medium">{formatTime(MOCK_SESSION.endTime)}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium">{t('selectOption')}</p>
            <div className="space-y-2">
              {extensionOptions.map(option => (
                <button
                  key={option.key}
                  onClick={() => setSelectedOption(option.key)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg border p-4 transition-colors',
                    selectedOption === option.key
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <span className="font-medium">{option.label}</span>
                  <span className="text-primary">{formatCurrency(option.price)}원</span>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <p className="mb-3 text-sm font-medium">{t('selectPayment')}</p>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map(method => (
                <button
                  key={method.key}
                  onClick={() => setSelectedPayment(method.key)}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors',
                    selectedPayment === method.key
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  {method.icon}
                  <span className="text-xs font-medium">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedOption && (
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground">{t('newEndTime')}</p>
              <p className="text-xl font-semibold text-primary">{getNewEndTime()}</p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-3 sm:gap-3">
          <Button variant="secondary" onClick={handleClose} size="touch" className="flex-1">
            {t('cancel')}
          </Button>
          <Button onClick={handleConfirm} size="touch" className="flex-1" disabled={!canConfirm}>
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
