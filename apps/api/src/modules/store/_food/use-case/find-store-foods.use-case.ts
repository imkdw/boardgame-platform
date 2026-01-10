import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { StoreFoodDto } from '../dto/store-food.dto';
import { toStoreFoodDto } from '../mapper/store-food.mapper';

@Injectable()
export class FindStoreFoodsUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
  ) {}

  async execute(storeId: string): Promise<StoreFoodDto[]> {
    await this.storeValidator.checkExist(storeId);

    const storeFoods = await this.prisma.storeFood.findMany({
      where: { storeId, deletedAt: null },
    });

    return storeFoods.map(toStoreFoodDto);
  }
}
