import { Injectable } from '@nestjs/common';
import { StoreFoodCategory } from '@prisma/client';
import { PrismaService, StoreFoodCategoryValidator, StoreValidator } from '@repo/server-shared';
import { CreateStoreFoodCategoryDto } from '../dto/create-store-food-category.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateStoreFoodCategoryUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly storeFoodCategoryValidator: StoreFoodCategoryValidator
  ) {}

  async execute(storeId: string, dto: CreateStoreFoodCategoryDto): Promise<StoreFoodCategory> {
    await this.storeValidator.checkExist(storeId);
    await this.storeFoodCategoryValidator.checkExistName(storeId, dto.name);

    return this.prisma.storeFoodCategory.create({
      data: {
        id: randomUUID(),
        storeId,
        name: dto.name,
      },
    });
  }
}
