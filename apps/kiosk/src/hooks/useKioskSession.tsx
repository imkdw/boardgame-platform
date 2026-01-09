import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { KioskSession, Room, TimePackage, PaymentMethodType } from '../types/kiosk';
import { initialKioskSession } from '../types/kiosk';
import { getPrice } from '../lib/mock-data';

interface KioskSessionContextValue extends KioskSession {
  setPeopleCount: (count: number) => void;
  setRoom: (room: Room) => void;
  setTimePackage: (pkg: TimePackage) => void;
  setPaymentMethod: (method: PaymentMethodType) => void;
  calculateEndTime: () => void;
  reset: () => void;
}

const KioskSessionContext = createContext<KioskSessionContextValue | null>(null);

export function KioskSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<KioskSession>(initialKioskSession);

  const setPeopleCount = useCallback((count: number) => {
    setSession(prev => ({ ...prev, peopleCount: count }));
  }, []);

  const setRoom = useCallback((room: Room) => {
    setSession(prev => ({ ...prev, selectedRoom: room }));
  }, []);

  const setTimePackage = useCallback((pkg: TimePackage) => {
    setSession(prev => ({
      ...prev,
      selectedTimePackage: pkg,
      totalPrice: getPrice(pkg),
    }));
  }, []);

  const setPaymentMethod = useCallback((method: PaymentMethodType) => {
    setSession(prev => ({ ...prev, selectedPaymentMethod: method }));
  }, []);

  const calculateEndTime = useCallback(() => {
    setSession(prev => {
      if (!prev.selectedTimePackage) return prev;

      const now = new Date();
      const endTime = prev.selectedTimePackage.isUnlimited
        ? null
        : new Date(now.getTime() + prev.selectedTimePackage.durationMinutes * 60 * 1000);

      return {
        ...prev,
        startTime: now,
        endTime,
      };
    });
  }, []);

  const reset = useCallback(() => {
    setSession(initialKioskSession);
  }, []);

  return (
    <KioskSessionContext.Provider
      value={{
        ...session,
        setPeopleCount,
        setRoom,
        setTimePackage,
        setPaymentMethod,
        calculateEndTime,
        reset,
      }}
    >
      {children}
    </KioskSessionContext.Provider>
  );
}

export function useKioskSession() {
  const context = useContext(KioskSessionContext);
  if (!context) {
    throw new Error('useKioskSession must be used within KioskSessionProvider');
  }
  return context;
}
