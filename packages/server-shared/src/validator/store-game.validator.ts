import { Injectable } from '@nestjs/common';
import { StoreGame } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ExistStoreGameNameException, StoreGameNotFoundException } from '../exception';

@Injectable()
export class StoreGameValidator {
  constructor(private readonly prisma: PrismaService) {}

  async checkExist(storeId: string, gameId: string): Promise<StoreGame> {
    const game = await this.prisma.storeGame.findFirst({
      where: { id: gameId, storeId, deletedAt: null },
    });

    if (!game) {
      throw new StoreGameNotFoundException(`StoreGame with id ${gameId} not found`);
    }

    return game;
  }

  async checkExistName(storeId: string, name: string): Promise<void> {
    const existing = await this.prisma.storeGame.findFirst({
      where: { storeId, name, deletedAt: null },
    });

    if (existing) {
      throw new ExistStoreGameNameException(`StoreGame with name ${name} already exists`);
    }
  }
}
