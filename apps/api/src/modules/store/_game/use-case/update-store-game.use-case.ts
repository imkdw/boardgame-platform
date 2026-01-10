import { Injectable } from '@nestjs/common';
import { PrismaService, StoreGameValidator } from '@repo/server-shared';
import { UpdateStoreGameDto } from '../dto/update-store-game.dto';

@Injectable()
export class UpdateStoreGameUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeGameValidator: StoreGameValidator
  ) {}

  async execute(storeId: string, gameId: string, dto: UpdateStoreGameDto): Promise<void> {
    const game = await this.storeGameValidator.checkExist(storeId, gameId);

    if (dto.name !== game.name) {
      await this.storeGameValidator.checkExistName(storeId, dto.name);
    }

    await this.prisma.storeGame.update({
      where: { id: gameId },
      data: dto,
    });
  }
}
