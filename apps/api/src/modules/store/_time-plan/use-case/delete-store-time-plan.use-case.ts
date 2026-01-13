import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { StoreTimePlanNotFoundException } from '@repo/server-shared';

@Injectable()
export class DeleteStoreTimePlanUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
  ) {}

  async execute(storeId: string, planId: string): Promise<void> {
    await this.storeValidator.checkExist(storeId);
    await this.checkExist(storeId, planId);

    await this.prisma.storeTimePlan.update({
      where: { id: planId },
      data: { deletedAt: new Date() },
    });
  }

  private async checkExist(storeId: string, planId: string): Promise<void> {
    const timePlan = await this.prisma.storeTimePlan.findFirst({
      where: { id: planId, storeId, deletedAt: null },
    });

    if (!timePlan) {
      throw new StoreTimePlanNotFoundException('시간 플랜을 찾을 수 없습니다');
    }
  }
}
