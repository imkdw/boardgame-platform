import { Injectable } from '@nestjs/common';
import { StoreFoodCategory } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ExistStoreFoodCategoryNameException, StoreFoodCategoryNotFoundException } from '../exception';

@Injectable()
export class StoreFoodCategoryValidator {
  constructor(private readonly prisma: PrismaService) {}

  async checkExist(storeId: string, categoryId: string): Promise<StoreFoodCategory> {
    const category = await this.prisma.storeFoodCategory.findFirst({
      where: { id: categoryId, storeId, deletedAt: null },
    });

    if (!category) {
      throw new StoreFoodCategoryNotFoundException(`StoreFoodCategory with id ${categoryId} not found`);
    }

    return category;
  }

  async checkExistName(storeId: string, name: string): Promise<void> {
    const existing = await this.prisma.storeFoodCategory.findFirst({
      where: { storeId, name, deletedAt: null },
    });

    if (existing) {
      throw new ExistStoreFoodCategoryNameException(`StoreFoodCategory with name ${name} already exists`);
    }
  }
}
