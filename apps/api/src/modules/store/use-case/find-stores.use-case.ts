import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/server-shared';
import { StoreDto } from '../dto/store.dto';
import { toStoreDto } from '../mapper/store.mapper';

@Injectable()
export class FindStoresUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<StoreDto[]> {
    const stores = await this.prisma.store.findMany({
      where: { deletedAt: null },
    });
    return stores.map(toStoreDto);
  }
}
