import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator, StoreGameValidator } from '@repo/server-shared';
import { CreateStoreGameDto } from '../dto/create-store-game.dto';
import { randomUUID } from 'crypto';
import { toStoreGameDto } from '../mapper/store-game.mapper';
import { StoreGameDto } from '../dto/store-game.dto';

@Injectable()
export class CreateStoreGameUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeGameValidator: StoreGameValidator
  ) {}

  async execute(storeId: string, dto: CreateStoreGameDto): Promise<StoreGameDto> {
    await this.storeValidator.checkExist(storeId);
    await this.storeGameValidator.checkExistName(storeId, dto.name);

    const game = await this.prisma.storeGame.create({
      data: { id: randomUUID(), storeId, ...dto },
    });

    return toStoreGameDto(game);
  }
}
