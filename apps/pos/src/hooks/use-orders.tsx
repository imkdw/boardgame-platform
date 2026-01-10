import { useState } from 'react';
import type { Order } from '@/types/pos';
import { mockPendingOrders } from '@/lib/mock-data';

interface UseOrdersReturn {
  pendingOrders: Order[];
  hasPendingOrders: boolean;
  getPendingOrdersCount: () => number;
  acknowledgeOrder: (orderId: string) => void;
  completeOrder: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
}

export function useOrders(): UseOrdersReturn {
  const [pendingOrders, setPendingOrders] = useState<Order[]>(mockPendingOrders);

  const hasPendingOrders = pendingOrders.length > 0;

  const getPendingOrdersCount = () => pendingOrders.length;

  const acknowledgeOrder = (orderId: string) => {
    setPendingOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: 'in_progress' as const } : order))
    );
  };

  const completeOrder = (orderId: string) => {
    setPendingOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  const cancelOrder = (orderId: string) => {
    setPendingOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  return {
    pendingOrders,
    hasPendingOrders,
    getPendingOrdersCount,
    acknowledgeOrder,
    completeOrder,
    cancelOrder,
  };
}
