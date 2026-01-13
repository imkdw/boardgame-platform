import type { Room, TimePackage, PaymentMethod } from '../types/kiosk';

export const MOCK_ROOMS: Room[] = [
  {
    id: 'room-1',
    number: 1,
    name: '1번 방',
    minCapacity: 2,
    maxCapacity: 4,
    status: 'available',
    description: '아늑한 소규모 방',
  },
  {
    id: 'room-2',
    number: 2,
    name: '2번 방',
    minCapacity: 4,
    maxCapacity: 6,
    status: 'occupied',
    description: '중간 규모 방',
  },
  {
    id: 'room-3',
    number: 3,
    name: '3번 방',
    minCapacity: 3,
    maxCapacity: 5,
    status: 'available',
    description: '편안한 분위기',
  },
  {
    id: 'room-4',
    number: 4,
    name: '4번 방',
    minCapacity: 2,
    maxCapacity: 4,
    status: 'available',
  },
  {
    id: 'room-5',
    number: 5,
    name: '5번 방',
    minCapacity: 4,
    maxCapacity: 6,
    status: 'available',
    description: '넓은 파티룸',
  },
  {
    id: 'room-6',
    number: 6,
    name: '6번 방',
    minCapacity: 6,
    maxCapacity: 8,
    status: 'occupied',
    description: '대형 단체룸',
  },
  {
    id: 'room-7',
    number: 7,
    name: '7번 방',
    minCapacity: 6,
    maxCapacity: 10,
    status: 'available',
    description: '최대 규모 방',
  },
];

export const MOCK_TIME_PACKAGES: TimePackage[] = [
  {
    id: 'time-1h',
    durationMinutes: 60,
    label: '1시간',
    price: 4000,
  },
  {
    id: 'time-2h',
    durationMinutes: 120,
    label: '2시간',
    price: 7000,
    isRecommended: true,
  },
  {
    id: 'time-3h',
    durationMinutes: 180,
    label: '3시간',
    price: 10000,
  },
  {
    id: 'time-allday',
    durationMinutes: 480,
    label: '종일권',
    price: 15000,
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card',
    label: '카드',
    icon: 'CreditCard',
  },
  {
    id: 'cash',
    label: '현금',
    icon: 'Banknote',
  },
  {
    id: 'kakaopay',
    label: '카카오페이',
    icon: 'MessageCircle',
  },
  {
    id: 'naverpay',
    label: '네이버페이',
    icon: 'Wallet',
  },
];

export function getPrice(pkg: TimePackage): number {
  return pkg.price;
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원';
}

export function getRecommendedRooms(rooms: Room[], peopleCount: number): Room[] {
  return rooms.filter(
    room => room.status === 'available' && room.minCapacity <= peopleCount && room.maxCapacity >= peopleCount
  );
}

export function getOtherRooms(rooms: Room[], peopleCount: number): Room[] {
  return rooms.filter(
    room => room.status === 'available' && (room.minCapacity > peopleCount || room.maxCapacity < peopleCount)
  );
}

export function getOccupiedRooms(rooms: Room[]): Room[] {
  return rooms.filter(room => room.status === 'occupied');
}
