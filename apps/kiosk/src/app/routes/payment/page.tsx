import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@repo/ui';
import { Loader2 } from 'lucide-react';
import { KioskLayout } from '../../../components/KioskLayout';
import { BackButton } from '../../../components/BackButton';
import { PaymentMethodCard } from '../../../components/PaymentMethodCard';
import { SummaryCard } from '../../../components/SummaryCard';
import { useKioskSession } from '../../../hooks/useKioskSession';
import { useIdleTimer } from '../../../hooks/useIdleTimer';
import { useCreateSession } from '../../../hooks/useCreateSession';
import { PAYMENT_METHODS } from '../../../lib/mock-data';
import { useState } from 'react';
import type { PaymentMethodType } from '../../../types/kiosk';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    storeId,
    peopleCount,
    selectedRoom,
    selectedTimePackage,
    selectedPaymentMethod,
    setPaymentMethod,
    calculateEndTime,
    setTotalPrice,
    setStartEndTime,
    reset,
  } = useKioskSession();
  const { createSession } = useCreateSession();
  const [tempSelected, setTempSelected] = useState<PaymentMethodType | null>(selectedPaymentMethod);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showWarning, dismissWarning, handleIdle } = useIdleTimer({
    timeout: 30000,
    redirectTo: '/',
    onIdle: reset,
    disabled: isProcessing,
  });

  const handlePaymentSelect = (methodId: PaymentMethodType) => {
    setTempSelected(methodId);
  };

  const handlePay = async () => {
    if (!tempSelected || !selectedRoom || !selectedTimePackage) return;

    setIsProcessing(true);
    setPaymentMethod(tempSelected);

    try {
      // storeId가 있으면 실제 API 호출
      if (storeId) {
        const session = await createSession(storeId, selectedRoom.id, {
          timePlanId: selectedTimePackage.id,
          peopleCount,
        });

        setTotalPrice(session.totalPrice);
        setStartEndTime(
          new Date(session.startedAt),
          session.scheduledEndAt ? new Date(session.scheduledEndAt) : null,
        );
      } else {
        // mock 모드에서는 기존 로직 사용
        await new Promise(resolve => setTimeout(resolve, 1500));
        calculateEndTime();
      }

      navigate('/complete');
    } catch {
      // 에러 발생 시 처리 (간단히 로딩 상태만 해제)
      setIsProcessing(false);
    }
  };

  if (!selectedRoom || !selectedTimePackage) {
    navigate('/select-time');
    return null;
  }

  return (
    <KioskLayout>
      <div className="flex items-center justify-between p-8">
        <BackButton to="/select-time" />
        <div className="text-lg text-muted-foreground">{t('common.step', { current: 4, total: 4 })}</div>
      </div>

      <div className="flex-1 overflow-y-auto px-12 pb-8">
        <h2 className="mb-8 text-3xl font-bold">{t('payment.title')}</h2>

        <div className="mb-8">
          <SummaryCard peopleCount={peopleCount} room={selectedRoom} timePackage={selectedTimePackage} />
        </div>

        <h3 className="mb-4 text-xl font-semibold">{t('payment.selectMethod')}</h3>
        <div className="space-y-4">
          {PAYMENT_METHODS.map(method => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={tempSelected === method.id}
              onClick={() => handlePaymentSelect(method.id)}
            />
          ))}
        </div>
      </div>

      <div className="border-t bg-card p-8">
        <Button size="touch-lg" className="w-full text-xl" disabled={!tempSelected || isProcessing} onClick={handlePay}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 size-6 animate-spin" />
              {t('payment.processing')}
            </>
          ) : (
            t('payment.payAndEnter')
          )}
        </Button>
      </div>

      <Dialog open={showWarning}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>{t('idle.warningTitle')}</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">{t('idle.warningMessage')}</p>
          <DialogFooter className="gap-4">
            <Button variant="outline" size="touch" onClick={handleIdle}>
              {t('idle.exit')}
            </Button>
            <Button size="touch" onClick={dismissWarning}>
              {t('idle.continue')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </KioskLayout>
  );
}
