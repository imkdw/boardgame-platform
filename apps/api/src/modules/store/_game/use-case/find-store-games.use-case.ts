import { Injectable } from '@nestjs/common';
import { Prisma, StoreGame } from '@prisma/client';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { GAME_SORT_BY, GAME_DIFFICULTY_ORDER, type GameDifficulty } from '@repo/consts';
import { toStoreGameDto } from '../mapper/store-game.mapper';
import { StoreGameDto } from '../dto/store-game.dto';
import { FindStoreGamesQueryDto } from '../dto/find-store-games-query.dto';

@Injectable()
export class FindStoreGamesUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator
  ) {}

  async execute(storeId: string, query: FindStoreGamesQueryDto = {}): Promise<StoreGameDto[]> {
    await this.storeValidator.checkExist(storeId);

    const games = await this.prisma.storeGame.findMany({
      where: this.buildWhereCondition(storeId, query),
      orderBy: this.buildOrderBy(query.sortBy),
    });

    return this.applySorting(games, query.sortBy).map(toStoreGameDto);
  }

  private buildWhereCondition(storeId: string, query: FindStoreGamesQueryDto): Prisma.StoreGameWhereInput {
    return {
      storeId,
      deletedAt: null,
      ...this.buildSearchFilter(query.search),
      ...this.buildPlayerCountFilter(query.playerCount),
      ...this.buildGenresFilter(query.genres),
      ...this.buildDifficultyFilter(query.difficulty),
      ...this.buildPlayTimeFilter(query.minPlayTime, query.maxPlayTime),
      ...this.buildAvailabilityFilter(query.availableOnly),
      ...this.buildRecommendedFilter(query.recommendedOnly),
    };
  }

  private buildSearchFilter(search?: string): Prisma.StoreGameWhereInput {
    if (!search) return {};
    return { name: { contains: search, mode: 'insensitive' } };
  }

  private buildPlayerCountFilter(playerCount?: number): Prisma.StoreGameWhereInput {
    if (!playerCount) return {};
    return {
      minPlayers: { lte: playerCount },
      maxPlayers: { gte: playerCount },
    };
  }

  private buildGenresFilter(genres?: string[]): Prisma.StoreGameWhereInput {
    if (!genres?.length) return {};
    return { genres: { hasSome: genres } };
  }

  private buildDifficultyFilter(difficulty?: string): Prisma.StoreGameWhereInput {
    if (!difficulty) return {};
    return { difficulty };
  }

  private buildPlayTimeFilter(minPlayTime?: number, maxPlayTime?: number): Prisma.StoreGameWhereInput {
    if (minPlayTime === undefined && maxPlayTime === undefined) return {};
    return {
      playTime: {
        ...(minPlayTime !== undefined && { gte: minPlayTime }),
        ...(maxPlayTime !== undefined && { lte: maxPlayTime }),
      },
    };
  }

  private buildAvailabilityFilter(availableOnly?: boolean): Prisma.StoreGameWhereInput {
    if (!availableOnly) return {};
    return { availableStock: { gt: 0 } };
  }

  private buildRecommendedFilter(recommendedOnly?: boolean): Prisma.StoreGameWhereInput {
    if (!recommendedOnly) return {};
    return { isRecommended: true };
  }

  private buildOrderBy(sortBy?: string): Prisma.StoreGameOrderByWithRelationInput[] {
    const orderByMap: Record<string, Prisma.StoreGameOrderByWithRelationInput[]> = {
      [GAME_SORT_BY.RECOMMENDED]: [{ isRecommended: 'desc' }, { name: 'asc' }],
      [GAME_SORT_BY.NAME]: [{ name: 'asc' }],
      [GAME_SORT_BY.DIFFICULTY]: [{ id: 'desc' }],
      [GAME_SORT_BY.POPULAR]: [{ id: 'desc' }],
    };

    return orderByMap[sortBy ?? ''] ?? [{ isRecommended: 'desc' }, { name: 'asc' }];
  }

  private applySorting(games: StoreGame[], sortBy?: string): StoreGame[] {
    if (sortBy === GAME_SORT_BY.DIFFICULTY) {
      return this.sortByDifficulty(games);
    }
    if (sortBy === GAME_SORT_BY.POPULAR) {
      return this.sortByPopularity(games);
    }
    return games;
  }

  private sortByDifficulty(games: StoreGame[]): StoreGame[] {
    return [...games].sort((a, b) => {
      const aOrder = GAME_DIFFICULTY_ORDER[a.difficulty as GameDifficulty] ?? 0;
      const bOrder = GAME_DIFFICULTY_ORDER[b.difficulty as GameDifficulty] ?? 0;
      return aOrder - bOrder;
    });
  }

  private sortByPopularity(games: StoreGame[]): StoreGame[] {
    return [...games].sort((a, b) => {
      const aUsage = a.stock - a.availableStock;
      const bUsage = b.stock - b.availableStock;
      return bUsage !== aUsage ? bUsage - aUsage : a.name.localeCompare(b.name, 'ko');
    });
  }
}
