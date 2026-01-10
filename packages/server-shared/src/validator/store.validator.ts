import { Injectable } from '@nestjs/common';
import { Store } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ExistStoreNameException } from '../exception/exist-store-name.exception';
import { StoreNotFoundException } from '../exception/store-not-found.exception';

@Injectable()
export class StoreValidator {
  constructor(private readonly prisma: PrismaService) {}

  async checkExist(storeId: string): Promise<Store> {
    const store = await this.prisma.store.findFirst({
      where: { id: storeId, deletedAt: null },
    });

    if (!store) {
      throw new StoreNotFoundException(`Store with id ${storeId} not found`);
    }

    return store;
  }

  async checkExistName(name: string): Promise<void> {
    const existingStore = await this.prisma.store.findFirst({
      where: { name, deletedAt: null },
    });

    if (existingStore) {
      throw new ExistStoreNameException(`Store with name ${name} already exists`);
    }
  }
}
