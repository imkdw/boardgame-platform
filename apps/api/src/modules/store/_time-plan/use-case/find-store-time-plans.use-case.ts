import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { StoreTimePlanDto } from '../dto/store-time-plan.dto';
import { toStoreTimePlanDto } from '../mapper/store-time-plan.mapper';

@Injectable()
export class FindStoreTimePlansUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
  ) {}

  async execute(storeId: string): Promise<StoreTimePlanDto[]> {
    await this.storeValidator.checkExist(storeId);

    const timePlans = await this.prisma.storeTimePlan.findMany({
      where: { storeId, deletedAt: null },
      orderBy: { sort: 'asc' },
    });

    return timePlans.map(toStoreTimePlanDto);
  }
}
