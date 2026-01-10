import { useMemo, useState } from 'react';
import type { Game, GameInstance, GameStatus, GameWithStock } from '@/types/pos';
import { mockGames, mockGameInstances, mockGameInventory, gameCategories } from '@/lib/mock-data';

interface UseGameRentalsReturn {
  // 레거시 (기존 코드 호환용)
  games: Game[];
  filteredGames: Game[];
  // 재고 기반 신규 기능
  gamesWithStock: GameWithStock[];
  filteredGamesWithStock: GameWithStock[];
  // 공통
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  rentGame: (gameId: string, roomId: string, roomNumber: number) => void;
  returnGame: (gameId: string, instanceId?: string) => void;
  getRentedGames: () => Game[];
  getRentedInstances: () => GameInstance[];
}

export function useGameRentals(): UseGameRentalsReturn {
  const [games, setGames] = useState<Game[]>(mockGames);
  const [instances, setInstances] = useState<GameInstance[]>(mockGameInstances);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 재고 정보 포함된 게임 목록 계산
  const gamesWithStock = useMemo((): GameWithStock[] => {
    return mockGameInventory.map((inventory) => {
      const gameInstances = instances.filter((inst) => inst.gameId === inventory.id);
      const rentedInstances = gameInstances.filter((inst) => inst.status === 'RENTED');
      const repairInstances = gameInstances.filter((inst) => inst.status === 'REPAIR');

      // 인스턴스가 없는 게임은 전부 available로 계산
      const rentedCount = rentedInstances.length;
      const repairCount = repairInstances.length > 0 ? repairInstances.length : inventory.repairCount;
      const availableCount = inventory.totalCount - rentedCount - repairCount;

      return {
        id: inventory.id,
        name: inventory.name,
        category: inventory.category,
        minPlayers: inventory.minPlayers,
        maxPlayers: inventory.maxPlayers,
        playTime: inventory.playTime,
        difficulty: inventory.difficulty,
        totalCount: inventory.totalCount,
        availableCount: Math.max(0, availableCount),
        rentedCount,
        repairCount,
        rentedInstances,
      };
    });
  }, [instances]);

  // 필터링된 게임 (레거시)
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '전체' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, selectedCategory]);

  // 필터링된 게임 (재고 포함)
  const filteredGamesWithStock = useMemo(() => {
    return gamesWithStock.filter((game) => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '전체' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [gamesWithStock, searchQuery, selectedCategory]);

  // 게임 대여
  const rentGame = (gameId: string, roomId: string, roomNumber: number) => {
    // 레거시 게임 상태 업데이트
    setGames((prev) =>
      prev.map((game) =>
        game.id === gameId
          ? {
              ...game,
              status: 'RENTED' as GameStatus,
              rentedToRoomId: roomId,
              rentedToRoomNumber: roomNumber,
              rentedAt: new Date(),
            }
          : game
      )
    );

    // 인스턴스 기반 대여 처리
    setInstances((prev) => {
      // 해당 게임의 available 인스턴스 찾기
      const existingInstance = prev.find(
        (inst) => inst.gameId === gameId && inst.status === 'AVAILABLE'
      );

      if (existingInstance) {
        // 기존 인스턴스 업데이트
        return prev.map((inst) =>
          inst.id === existingInstance.id
            ? {
                ...inst,
                status: 'RENTED' as GameStatus,
                rentedToRoomId: roomId,
                rentedToRoomNumber: roomNumber,
                rentedAt: new Date(),
              }
            : inst
        );
      } else {
        // 새 인스턴스 생성 (처음 대여하는 경우)
        const newInstance: GameInstance = {
          id: `instance-${gameId}-${Date.now()}`,
          gameId,
          status: 'RENTED',
          rentedToRoomId: roomId,
          rentedToRoomNumber: roomNumber,
          rentedAt: new Date(),
        };
        return [...prev, newInstance];
      }
    });
  };

  // 게임 반납
  const returnGame = (gameId: string, instanceId?: string) => {
    // 레거시 게임 상태 업데이트
    setGames((prev) =>
      prev.map((game) =>
        game.id === gameId
          ? {
              ...game,
              status: 'AVAILABLE' as GameStatus,
              rentedToRoomId: undefined,
              rentedToRoomNumber: undefined,
              rentedAt: undefined,
            }
          : game
      )
    );

    // 인스턴스 기반 반납 처리
    setInstances((prev) => {
      if (instanceId) {
        // 특정 인스턴스 반납
        return prev.map((inst) =>
          inst.id === instanceId
            ? {
                ...inst,
                status: 'AVAILABLE' as GameStatus,
                rentedToRoomId: undefined,
                rentedToRoomNumber: undefined,
                rentedAt: undefined,
              }
            : inst
        );
      } else {
        // gameId로 첫 번째 대여 중인 인스턴스 반납
        const rentedInstance = prev.find(
          (inst) => inst.gameId === gameId && inst.status === 'RENTED'
        );
        if (rentedInstance) {
          return prev.map((inst) =>
            inst.id === rentedInstance.id
              ? {
                  ...inst,
                  status: 'AVAILABLE' as GameStatus,
                  rentedToRoomId: undefined,
                  rentedToRoomNumber: undefined,
                  rentedAt: undefined,
                }
              : inst
          );
        }
        return prev;
      }
    });
  };

  // 대여 중인 게임 (레거시)
  const getRentedGames = () => {
    return games.filter((game) => game.status === 'RENTED');
  };

  // 대여 중인 인스턴스
  const getRentedInstances = () => {
    return instances.filter((inst) => inst.status === 'RENTED');
  };

  return {
    games,
    filteredGames,
    gamesWithStock,
    filteredGamesWithStock,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories: gameCategories,
    rentGame,
    returnGame,
    getRentedGames,
    getRentedInstances,
  };
}

export function getGameStatusLabel(status: GameStatus): string {
  switch (status) {
    case 'AVAILABLE':
      return '대여 가능';
    case 'RENTED':
      return '대여중';
    case 'REPAIR':
      return '수리중';
    default:
      return '알 수 없음';
  }
}

export function getDifficultyStars(difficulty: 1 | 2 | 3): string {
  return '⭐'.repeat(difficulty);
}
