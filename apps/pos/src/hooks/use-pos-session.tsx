import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ActiveRoom, CartItem, Order, POSSession } from '@/types/pos';
import { initialPOSSession } from '@/types/pos';

interface POSContextValue {
  session: POSSession;
  cart: CartItem[];
  pendingOrders: Order[];
  selectedRoom: ActiveRoom | null;
  setSelectedRoom: (room: ActiveRoom | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (menuItemId: string) => void;
  updateCartItemQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const POSContext = createContext<POSContextValue | null>(null);

interface Props {
  children: ReactNode;
}

export function POSSessionProvider({ children }: Props) {
  const [session] = useState<POSSession>(initialPOSSession);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ActiveRoom | null>(null);
  const [pendingOrders] = useState<Order[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.menuItemId === item.menuItemId);
      if (existing) {
        return prev.map((i) => (i.menuItemId === item.menuItemId ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setCart((prev) => prev.filter((i) => i.menuItemId !== menuItemId));
  };

  const updateCartItemQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }
    setCart((prev) => prev.map((i) => (i.menuItemId === menuItemId ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  };

  return (
    <POSContext.Provider
      value={{
        session,
        cart,
        pendingOrders,
        selectedRoom,
        setSelectedRoom,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </POSContext.Provider>
  );
}

export function usePOSSession(): POSContextValue {
  const context = useContext(POSContext);
  if (!context) {
    throw new Error('usePOSSession must be used within a POSSessionProvider');
  }
  return context;
}
