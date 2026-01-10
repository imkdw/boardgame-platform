import { Injectable } from '@nestjs/common';
import { StoreFood } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ExistStoreFoodNameException, StoreFoodNotFoundException } from '../exception/store-food';

@Injectable()
export class StoreFoodValidator {
  constructor(private readonly prisma: PrismaService) {}

  async checkExist(storeId: string, foodId: string): Promise<StoreFood> {
    const storeFood = await this.prisma.storeFood.findFirst({
      where: { id: foodId, storeId, deletedAt: null },
    });

    if (!storeFood) {
      throw new StoreFoodNotFoundException(`StoreFood with id ${foodId} not found`);
    }

    return storeFood;
  }

  async checkExistName(storeId: string, name: string): Promise<void> {
    const existing = await this.prisma.storeFood.findFirst({
      where: { storeId, name, deletedAt: null },
    });

    if (existing) {
      throw new ExistStoreFoodNameException(`StoreFood with name ${name} already exists`);
    }
  }
}
