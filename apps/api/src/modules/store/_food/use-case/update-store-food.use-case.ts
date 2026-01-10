import { Injectable } from '@nestjs/common';
import { PrismaService, StoreFoodValidator, StoreValidator } from '@repo/server-shared';
import { UpdateStoreFoodDto } from '../dto/update-store-food.dto';

@Injectable()
export class UpdateStoreFoodUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeFoodValidator: StoreFoodValidator,
  ) {}

  async execute(storeId: string, foodId: string, dto: UpdateStoreFoodDto): Promise<void> {
    await this.storeValidator.checkExist(storeId);
    const storeFood = await this.storeFoodValidator.checkExist(storeId, foodId);

    if (dto.name !== storeFood.name) {
      await this.storeFoodValidator.checkExistName(storeId, dto.name);
    }

    await this.prisma.storeFood.update({
      where: { id: foodId },
      data: dto,
    });
  }
}
