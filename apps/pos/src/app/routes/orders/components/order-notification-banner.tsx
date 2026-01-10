import { Button, Alert, AlertTitle, AlertDescription } from '@repo/ui';
import { Bell } from 'lucide-react';
import type { Order } from '@/types/pos';

interface Props {
  orders: Order[];
  onAcknowledge: (orderId: string) => void;
  onComplete: (orderId: string) => void;
}

export function OrderNotificationBanner({ orders, onAcknowledge, onComplete }: Props) {
  const firstOrder = orders[0];
  if (!firstOrder) return null;
  const itemSummary = firstOrder.items.map((item) => `${item.menuItem.name} x${item.quantity}`).join(', ');
  const paymentLabel = firstOrder.paymentMethod === 'pg' ? 'PG 결제 완료' : firstOrder.paymentMethod === 'card' ? '카드 결제' : '현금 결제';

  return (
    <Alert className="m-4 border-primary bg-primary/10">
      <Bell className="size-4" />
      <AlertTitle className="flex items-center gap-2">
        새 주문 도착! {firstOrder.roomNumber}번방 - {itemSummary}
        <span className="text-sm font-normal text-muted-foreground">({paymentLabel})</span>
      </AlertTitle>
      <AlertDescription className="mt-2 flex gap-2">
        <Button size="sm" onClick={() => onAcknowledge(firstOrder.id)}>
          확인
        </Button>
        <Button size="sm" variant="outline" onClick={() => onComplete(firstOrder.id)}>
          완료 처리
        </Button>
        {orders.length > 1 && (
          <span className="ml-2 text-sm text-muted-foreground">+{orders.length - 1}건 더 있음</span>
        )}
      </AlertDescription>
    </Alert>
  );
}
