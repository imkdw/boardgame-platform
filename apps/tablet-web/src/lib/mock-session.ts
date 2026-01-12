export interface ExtensionPayment {
  amount: number;
  minutes: number;
  paidAt: Date;
}

export interface SessionData {
  isActive: boolean;
  tableNumber: string;
  startTime: Date;
  purchasedMinutes: number;
  remainingSeconds: number;
  endTime: Date;
  initialPayment: number;
  extensionPayments: ExtensionPayment[];
}

export const MOCK_SESSION: SessionData = {
  isActive: false,
  tableNumber: '1',
  startTime: new Date('2026-01-09T14:00:00'),
  purchasedMinutes: 120,
  remainingSeconds: 5400,
  endTime: new Date('2026-01-09T16:00:00'),
  initialPayment: 8000,
  extensionPayments: [{ amount: 4000, minutes: 60, paidAt: new Date('2026-01-09T15:50:00') }],
};
