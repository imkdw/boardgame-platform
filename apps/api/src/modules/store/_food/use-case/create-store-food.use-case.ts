import { Injectable } from '@nestjs/common';
import { StoreFood } from '@prisma/client';
import { PrismaService, StoreFoodValidator, StoreValidator } from '@repo/server-shared';
import { CreateStoreFoodDto } from '../dto/create-store-food.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateStoreFoodUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeFoodValidator: StoreFoodValidator,
  ) {}

  async execute(storeId: string, dto: CreateStoreFoodDto): Promise<StoreFood> {
    await this.storeValidator.checkExist(storeId);
    await this.storeFoodValidator.checkExistName(storeId, dto.name);

    const foodId = randomUUID();

    return this.prisma.$transaction(async (tx) => {
      const storeFood = await tx.storeFood.create({
        data: {
          id: foodId,
          storeId,
          name: dto.name,
          description: dto.description,
          price: dto.price,
          isPopular: dto.isPopular,
          isNew: dto.isNew,
          imageUrl: dto.imageUrl ?? null,
        },
      });

      await tx.storeFoodCategoryItem.create({
        data: {
          categoryId: dto.categoryId,
          foodId: storeFood.id,
        },
      });

      return storeFood;
    });
  }
}
