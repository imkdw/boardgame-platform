// 개발용 목 데이터

import { MOCK_FOODS as mockFoodsFromConsts } from '@repo/consts';
import type { ActiveRoom, Game, GameInstance, GameInventory, MenuCategory, Order, RoomStatus } from '@/types/pos';

// 40개 룸 생성 (1-40)
export function generateMockRooms(): ActiveRoom[] {
  const statuses: RoomStatus[] = ['IN_USE', 'AVAILABLE', 'RESERVED', 'MAINTENANCE'];
  const rooms: ActiveRoom[] = [];

  for (let i = 1; i <= 40; i++) {
    const status = statuses[Math.floor(Math.random() * 4)];
    const now = new Date();

    let checkInTime: Date | null = null;
    let endTime: Date | null = null;
    let reservedTime: Date | undefined;

    if (status === 'IN_USE') {
      // 랜덤 시간 전에 체크인 (30분 ~ 3시간 전)
      const minutesAgo = Math.floor(Math.random() * 150) + 30;
      checkInTime = new Date(now.getTime() - minutesAgo * 60 * 1000);
      // 2시간 패키지 가정
      endTime = new Date(checkInTime.getTime() + 120 * 60 * 1000);
    } else if (status === 'RESERVED') {
      // 30분 ~ 2시간 후 예약
      const minutesLater = Math.floor(Math.random() * 90) + 30;
      reservedTime = new Date(now.getTime() + minutesLater * 60 * 1000);
    }

    rooms.push({
      id: `room-${i}`,
      roomNumber: i,
      status,
      checkInTime,
      endTime,
      rentedGames:
        status === 'IN_USE' && checkInTime
          ? [
              { id: `rg-${i}-1`, gameId: 'game-1', gameName: '스플렌더', rentedAt: checkInTime },
              { id: `rg-${i}-2`, gameId: 'game-2', gameName: '다빈치코드', rentedAt: checkInTime },
            ].slice(0, Math.floor(Math.random() * 3))
          : [],
      pendingOrderCount: status === 'IN_USE' ? Math.floor(Math.random() * 3) : 0,
      reservedTime,
    });
  }

  return rooms;
}

// 메뉴 카테고리 (MOCK_FOOD_CATEGORIES의 categoryId와 매칭)
export const mockMenuCategories: MenuCategory[] = [
  { id: 'drink', name: '음료' },
  { id: 'snack', name: '분식' },
  { id: 'fried', name: '튀김류' },
];

// 메뉴 아이템 (공통 mock 데이터 사용)
export const mockMenuItems = mockFoodsFromConsts;

// 게임 목록 (레거시 - 기존 코드 호환용)
export const mockGames: Game[] = [
  { id: 'game-1', name: '스플렌더', category: '전략', minPlayers: 2, maxPlayers: 4, playTime: 30, difficulty: 2, status: 'AVAILABLE' },
  { id: 'game-2', name: '카탄', category: '전략', minPlayers: 3, maxPlayers: 4, playTime: 90, difficulty: 3, status: 'RENTED', rentedToRoomId: 'room-1', rentedToRoomNumber: 1 },
  { id: 'game-3', name: '뱅!', category: '파티', minPlayers: 4, maxPlayers: 7, playTime: 40, difficulty: 2, status: 'AVAILABLE' },
  { id: 'game-4', name: '다빈치코드', category: '추리', minPlayers: 2, maxPlayers: 4, playTime: 20, difficulty: 1, status: 'AVAILABLE' },
  { id: 'game-5', name: '루미큐브', category: '전략', minPlayers: 2, maxPlayers: 4, playTime: 45, difficulty: 1, status: 'REPAIR' },
  { id: 'game-6', name: '아줄', category: '전략', minPlayers: 2, maxPlayers: 4, playTime: 45, difficulty: 2, status: 'AVAILABLE' },
  { id: 'game-7', name: '티켓투라이드', category: '전략', minPlayers: 2, maxPlayers: 5, playTime: 60, difficulty: 2, status: 'AVAILABLE' },
  { id: 'game-8', name: '킹도미노', category: '전략', minPlayers: 2, maxPlayers: 4, playTime: 15, difficulty: 1, status: 'AVAILABLE' },
  { id: 'game-9', name: '코드네임', category: '파티', minPlayers: 4, maxPlayers: 8, playTime: 15, difficulty: 1, status: 'RENTED', rentedToRoomId: 'room-2', rentedToRoomNumber: 2 },
  { id: 'game-10', name: '하나비', category: '협력', minPlayers: 2, maxPlayers: 5, playTime: 25, difficulty: 2, status: 'AVAILABLE' },
  { id: 'game-11', name: '팬데믹', category: '협력', minPlayers: 2, maxPlayers: 4, playTime: 60, difficulty: 3, status: 'AVAILABLE' },
  { id: 'game-12', name: '러브레터', category: '파티', minPlayers: 2, maxPlayers: 4, playTime: 20, difficulty: 1, status: 'AVAILABLE' },
  { id: 'game-13', name: '도블', category: '파티', minPlayers: 2, maxPlayers: 8, playTime: 10, difficulty: 1, status: 'AVAILABLE' },
  { id: 'game-14', name: '할리갈리', category: '파티', minPlayers: 2, maxPlayers: 6, playTime: 15, difficulty: 1, status: 'AVAILABLE' },
  { id: 'game-15', name: '7원더스', category: '전략', minPlayers: 2, maxPlayers: 7, playTime: 30, difficulty: 2, status: 'AVAILABLE' },
];

// 게임 재고 (각 게임별 보유 개수)
export const mockGameInventory: GameInventory[] = [
  { id: 'game-1', name: '스플렌더', category: '전략', minPlayers: 2, maxPlayers: 4, playTime: 30, difficulty: 2, totalCount: 3, repairCount: 0 },
  { id: 'game-2', name: '카탄', category: '전략', minPlayers: 3, maxPlayers: 4, playTime: 90, difficulty: 3, totalCount: 2, repairCount: 0 },
  { id: 'game-3', name: '뱅!', category: '파티', minPlayers: 4, maxPlayers: 7, playTime: 40, difficulty: 2, totalCount: 2, repairCount: 0 },
  { id: 'game-4', name: '다빈치코드', category: '추리', minPlayers: 2, maxPlayers: 4, playTime: 20, difficulty: 1, totalCount: 4, repairCount: 0 },
  { id: 'game-5', name: '루미큐브', category: '전략', minPlayers: 2, maxPlayers: 4, playTime: 45, difficulty: 1, totalCount: 3, repairCount: 1 },
  { id: 'game-6', name: '아줄', category: '전략', minPlayers: 2, maxPlayers: 4, playTime: 45, difficulty: 2, totalCount: 2, repairCount: 0 },
  { id: 'game-7', name: '티켓투라이드', category: '전략', minPlayers: 2, maxPlayers: 5, playTime: 60, difficulty: 2, totalCount: 2, repairCount: 0 },
  { id: 'game-8', name: '킹도미노', category: '전략', minPlayers: 2, maxPlayers: 4, playTime: 15, difficulty: 1, totalCount: 3, repairCount: 0 },
  { id: 'game-9', name: '코드네임', category: '파티', minPlayers: 4, maxPlayers: 8, playTime: 15, difficulty: 1, totalCount: 2, repairCount: 0 },
  { id: 'game-10', name: '하나비', category: '협력', minPlayers: 2, maxPlayers: 5, playTime: 25, difficulty: 2, totalCount: 2, repairCount: 0 },
  { id: 'game-11', name: '팬데믹', category: '협력', minPlayers: 2, maxPlayers: 4, playTime: 60, difficulty: 3, totalCount: 1, repairCount: 0 },
  { id: 'game-12', name: '러브레터', category: '파티', minPlayers: 2, maxPlayers: 4, playTime: 20, difficulty: 1, totalCount: 3, repairCount: 0 },
  { id: 'game-13', name: '도블', category: '파티', minPlayers: 2, maxPlayers: 8, playTime: 10, difficulty: 1, totalCount: 4, repairCount: 0 },
  { id: 'game-14', name: '할리갈리', category: '파티', minPlayers: 2, maxPlayers: 6, playTime: 15, difficulty: 1, totalCount: 3, repairCount: 0 },
  { id: 'game-15', name: '7원더스', category: '전략', minPlayers: 2, maxPlayers: 7, playTime: 30, difficulty: 2, totalCount: 2, repairCount: 0 },
];

// 게임 인스턴스 (대여 상태 추적)
export const mockGameInstances: GameInstance[] = [
  // 카탄 - 2개 중 1개 대여중
  { id: 'instance-2-1', gameId: 'game-2', status: 'RENTED', rentedToRoomId: 'room-1', rentedToRoomNumber: 1, rentedAt: new Date() },
  { id: 'instance-2-2', gameId: 'game-2', status: 'AVAILABLE' },
  // 코드네임 - 2개 중 1개 대여중
  { id: 'instance-9-1', gameId: 'game-9', status: 'RENTED', rentedToRoomId: 'room-2', rentedToRoomNumber: 2, rentedAt: new Date() },
  { id: 'instance-9-2', gameId: 'game-9', status: 'AVAILABLE' },
  // 루미큐브 - 3개 중 1개 수리중
  { id: 'instance-5-1', gameId: 'game-5', status: 'REPAIR' },
  { id: 'instance-5-2', gameId: 'game-5', status: 'AVAILABLE' },
  { id: 'instance-5-3', gameId: 'game-5', status: 'AVAILABLE' },
];

// 새 주문 알림 목데이터
const menuItem1 = mockMenuItems[0];
const menuItem2 = mockMenuItems[1];

export const mockPendingOrders: Order[] = menuItem1 && menuItem2 ? [
  {
    id: 'order-1',
    items: [
      { id: 'item-1', menuItem: menuItem1, quantity: 2 },
      { id: 'item-2', menuItem: menuItem2, quantity: 1 },
    ],
    status: 'pending',
    totalPrice: 14000,
    roomId: 'room-1',
    roomNumber: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    paymentMethod: 'pg',
  },
] : [];

// 게임 카테고리 목록
export const gameCategories = ['전체', '전략', '파티', '추리', '협력'];
