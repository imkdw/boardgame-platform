import { Button, Separator } from '@repo/ui';
import type { ActiveRoom, CartItem } from '@/types/pos';
import { CartItemRow } from './cart-item';
import { formatPrice } from '@/lib/format';
import { SectionHeader } from '@/components/shared/section-header';

interface Props {
  cart: CartItem[];
  selectedRoom: ActiveRoom | null;
  onUpdateQuantity: (menuItemId: string, quantity: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onClear: () => void;
  total: number;
}

export function OrderCart({ cart, selectedRoom, onUpdateQuantity, onRemoveItem, onClear, total }: Props) {
  const handleCashPayment = () => {
    // TODO: 현금 결제 처리
    alert(`현금 결제: ${formatPrice(total)}원`);
    onClear();
  };

  const handleCardPayment = () => {
    // TODO: 카드 결제 처리
    alert(`카드 결제: ${formatPrice(total)}원`);
    onClear();
  };

  return (
    <div className="flex h-full flex-col">
      <SectionHeader title="주문 내역" />

      {selectedRoom && (
        <div className="mb-2 text-sm text-muted-foreground">{selectedRoom.roomNumber}번방</div>
      )}

      <div className="flex-1 space-y-2 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">장바구니가 비어있습니다</p>
        ) : (
          cart.map((item) => (
            <CartItemRow
              key={item.menuItemId}
              item={item}
              onUpdateQuantity={(qty) => onUpdateQuantity(item.menuItemId, qty)}
              onRemove={() => onRemoveItem(item.menuItemId)}
            />
          ))
        )}
      </div>

      <Separator className="my-4" />

      <div className="space-y-4">
        <div className="flex items-center justify-between text-lg font-bold">
          <span>총액:</span>
          <span className="text-primary">{formatPrice(total)}원</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            disabled={cart.length === 0}
            onClick={handleCashPayment}
          >
            현금결제
          </Button>
          <Button
            variant="default"
            className="flex-1"
            disabled={cart.length === 0}
            onClick={handleCardPayment}
          >
            카드결제
          </Button>
        </div>
      </div>
    </div>
  );
}
