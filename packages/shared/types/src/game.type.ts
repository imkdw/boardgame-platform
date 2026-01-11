import type { GameDifficulty, GameGenre } from '@repo/consts';

export type { GameDifficulty, GameGenre } from '@repo/consts';

/**
 * 게임 아이템 타입 (공통)
 * - tablet-web, kiosk: 게임 검색/상세 표시
 * - POS: 게임 대여/반납 관리
 */
export interface GameItem {
  id: string;
  name: string;
  thumbnail?: string;
  images?: string[];
  minPlayers: number;
  maxPlayers: number;
  playTime: number;
  difficulty: GameDifficulty;
  genres: GameGenre[];
  category?: string;
  description?: string;
  rules?: string;
  videoUrl?: string;
  // 재고 정보
  stock: number;
  availableStock: number;
  // 상태 플래그
  isAvailable: boolean;
  isRecommended?: boolean;
}

/**
 * 게임 재고 상세 정보 (POS용 확장)
 */
export interface GameStockDetail {
  totalCount: number;
  availableCount: number;
  rentedCount: number;
  repairCount: number;
}

/**
 * 재고 상세 정보가 포함된 게임 아이템
 */
export type GameItemWithStock = GameItem & GameStockDetail;
