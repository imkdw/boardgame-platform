import { Button } from '@repo/ui';
import { Minus, Plus, X } from 'lucide-react';
import type { CartItem } from '@/types/pos';
import { formatPrice } from '@/lib/format';

interface Props {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: Props) {
  const itemTotal = item.menuItem.price * item.quantity;

  return (
    <div className="flex items-center justify-between rounded-lg border p-2">
      <div className="flex-1">
        <div className="font-medium">{item.menuItem.name}</div>
        <div className="text-sm text-muted-foreground">{formatPrice(itemTotal)}원</div>
      </div>

      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost" className="size-7" onClick={() => onUpdateQuantity(item.quantity - 1)}>
          <Minus className="size-3" />
        </Button>
        <span className="w-6 text-center">{item.quantity}</span>
        <Button size="icon" variant="ghost" className="size-7" onClick={() => onUpdateQuantity(item.quantity + 1)}>
          <Plus className="size-3" />
        </Button>
        <Button size="icon" variant="ghost" className="size-7 text-destructive" onClick={onRemove}>
          <X className="size-3" />
        </Button>
      </div>
    </div>
  );
}
