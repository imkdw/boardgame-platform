import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { toStoreGameDto } from '../mapper/store-game.mapper';
import { StoreGameDto } from '../dto/store-game.dto';

@Injectable()
export class FindStoreGamesUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator
  ) {}

  async execute(storeId: string): Promise<StoreGameDto[]> {
    await this.storeValidator.checkExist(storeId);

    const games = await this.prisma.storeGame.findMany({
      where: {
        storeId,
        deletedAt: null,
      },
      orderBy: { id: 'desc' },
    });

    return games.map(toStoreGameDto);
  }
}
