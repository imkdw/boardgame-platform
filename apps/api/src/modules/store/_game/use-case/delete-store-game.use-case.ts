import { Injectable } from '@nestjs/common';
import { PrismaService, StoreGameValidator } from '@repo/server-shared';

@Injectable()
export class DeleteStoreGameUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeGameValidator: StoreGameValidator,
  ) {}

  async execute(storeId: string, gameId: string): Promise<void> {
    await this.storeGameValidator.checkExist(storeId, gameId);

    await this.prisma.storeGame.update({
      where: { id: gameId },
      data: { deletedAt: new Date() },
    });
  }
}
