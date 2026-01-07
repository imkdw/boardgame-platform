export interface SessionData {
  isActive: boolean;
  tableNumber: string;
  remainingSeconds: number;
  endTime: Date;
}

export const MOCK_SESSION: SessionData = {
  isActive: true,
  tableNumber: '1',
  remainingSeconds: 5400,
  endTime: new Date('2026-01-07T15:30:00'),
};
