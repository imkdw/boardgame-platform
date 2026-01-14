'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, Button, Badge } from '@repo/ui';
import { useAsyncAction } from '@repo/web-shared';
import { createFoodOrder, MOCK_SESSION } from '@/lib';
import { useCartStore } from '../stores/cart-store';
import { OrderConfirmDialog } from './order-confirm-dialog';

interface Props {
  storeId: string;
  disabled?: boolean;
}

export function CartSheet({ storeId, disabled }: Props) {
  const locale = useLocale();
  const t = useTranslations('FoodOrder.cart');
  const tSuccess = useTranslations('FoodOrder.toast.success');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice, getTotalItems } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const { execute: submitOrder, isPending } = useAsyncAction(
    async () => {
      const orderData = {
        roomSessionId: null,
        roomNumber: parseInt(MOCK_SESSION.tableNumber, 10),
        items: items.map(item => ({
          foodId: item.foodItem.id,
          quantity: item.quantity,
        })),
      };

      await createFoodOrder(storeId, orderData);
    },
    {
      toast: {
        success: (message: string) => toast.success(message),
        error: (message: string) => toast.error(message),
      },
      successMessage: tSuccess('orderPlaced'),
      onSuccess: () => {
        clearCart();
        setConfirmDialogOpen(false);
        setSheetOpen(false);
      },
    }
  );

  const handleOrderClick = () => {
    setConfirmDialogOpen(true);
  };

  const handleOrderConfirm = async () => {
    await submitOrder();
  };

  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="default" size="touch" className="relative gap-2" disabled={disabled}>
            <ShoppingCart className="h-5 w-5" />
            <span>{t('title')}</span>
            {totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full p-0"
              >
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex w-[480px] flex-col sm:max-w-[480px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {t('title')}
              {totalItems > 0 && <Badge variant="secondary">{totalItems}</Badge>}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-auto px-2 py-6">
            {items.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">{t('empty')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map(item => {
                  const displayName = locale === 'ko' ? item.foodItem.name : item.foodItem.nameEn;
                  return (
                    <div
                      key={item.foodItem.id}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex-1 space-y-1">
                        <h4 className="text-base font-semibold text-card-foreground">{displayName}</h4>
                        <p className="text-sm font-medium text-primary">
                          {item.foodItem.price.toLocaleString()}
                          {t('currency')}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.foodItem.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center text-lg font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.foodItem.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.foodItem.id)}>
                          <Trash2 className="h-5 w-5 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <SheetFooter className="flex-col gap-4 border-t border-border px-2 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">{t('total')}</span>
              <span className="text-2xl font-bold text-primary">
                {totalPrice.toLocaleString()}
                {t('currency')}
              </span>
            </div>
            <Button
              variant="default"
              size="touch-lg"
              className="w-full"
              disabled={(disabled ?? false) || items.length === 0}
              onClick={handleOrderClick}
            >
              {t('order')}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <OrderConfirmDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        items={items}
        totalPrice={totalPrice}
        onConfirm={handleOrderConfirm}
        isPending={isPending}
      />
    </>
  );
}
