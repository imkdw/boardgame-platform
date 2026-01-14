'use client';

import { useLocale, useTranslations } from 'next-intl';
import { CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
} from '@repo/ui';
import type { CartItem } from '../types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  totalPrice: number;
  onConfirm: () => void;
  isPending?: boolean;
}

export function OrderConfirmDialog({ open, onOpenChange, items, totalPrice, onConfirm, isPending }: Props) {
  const locale = useLocale();
  const t = useTranslations('FoodOrder.orderConfirm');

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            {t('title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-muted-foreground">{t('message')}</p>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <h4 className="mb-3 font-medium">{t('orderSummary')}</h4>
            <div className="space-y-2">
              {items.map(item => {
                const displayName = locale === 'ko' ? item.foodItem.name : item.foodItem.nameEn;
                return (
                  <div key={item.foodItem.id} className="flex justify-between text-sm">
                    <span>
                      {displayName} x {item.quantity}
                    </span>
                    <span>{(item.foodItem.price * item.quantity).toLocaleString()}{t('currency')}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 border-t border-border pt-3">
              <div className="flex justify-between font-bold">
                <span>{t('total')}</span>
                <span className="text-primary">
                  {totalPrice.toLocaleString()}{t('currency')}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{t('notice')}</p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" size="touch" onClick={() => onOpenChange(false)} disabled={isPending}>
            {t('cancel')}
          </Button>
          <Button variant="default" size="touch" onClick={handleConfirm} disabled={isPending}>
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
