import { useState } from 'react';
import { useOrders } from '@/hooks/use-orders';
import { useCart } from '@/hooks/use-cart';
import { useRooms } from '@/hooks/use-rooms';
import { OrderNotificationBanner } from './components/order-notification-banner';
import { RoomSelector } from './components/room-selector';
import { MenuSelector } from './components/menu-selector';
import { OrderCart } from './components/order-cart';
import type { ActiveRoom } from '@/types/pos';

export default function OrdersPage() {
  const { pendingOrders, hasPendingOrders, acknowledgeOrder, completeOrder } = useOrders();
  const { cart, addItem, removeItem, updateQuantity, clearCart, getTotal } = useCart();
  const { rooms } = useRooms();
  const [selectedRoom, setSelectedRoom] = useState<ActiveRoom | null>(null);

  // 사용중인 룸만 필터링
  const activeRooms = rooms.filter((room) => room.status === 'IN_USE');

  return (
    <div className="flex h-full flex-col">
      {hasPendingOrders && (
        <OrderNotificationBanner
          orders={pendingOrders}
          onAcknowledge={acknowledgeOrder}
          onComplete={completeOrder}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* 룸 선택 영역 */}
        <div className="w-48 shrink-0 overflow-y-auto border-r p-4">
          <RoomSelector
            rooms={activeRooms}
            selectedRoom={selectedRoom}
            onSelectRoom={setSelectedRoom}
          />
        </div>

        {/* 메뉴 선택 영역 */}
        <div className="flex-1 overflow-y-auto p-4">
          <MenuSelector onAddItem={addItem} />
        </div>

        {/* 장바구니 영역 */}
        <div className="w-72 shrink-0 overflow-y-auto border-l p-4">
          <OrderCart
            cart={cart}
            selectedRoom={selectedRoom}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onClear={clearCart}
            total={getTotal()}
          />
        </div>
      </div>
    </div>
  );
}
