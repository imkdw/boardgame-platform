import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { StoreTimePlanNotFoundException, StoreTimePlanNameDuplicatedException } from '@repo/server-shared';
import { UpdateStoreTimePlanDto } from '../dto/update-store-time-plan.dto';

@Injectable()
export class UpdateStoreTimePlanUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
  ) {}

  async execute(storeId: string, planId: string, dto: UpdateStoreTimePlanDto): Promise<void> {
    await this.storeValidator.checkExist(storeId);
    const timePlan = await this.checkExist(storeId, planId);

    if (dto.name !== timePlan.name) {
      await this.checkExistName(storeId, dto.name);
    }

    await this.prisma.storeTimePlan.update({
      where: { id: planId },
      data: dto,
    });
  }

  private async checkExist(storeId: string, planId: string) {
    const timePlan = await this.prisma.storeTimePlan.findFirst({
      where: { id: planId, storeId, deletedAt: null },
    });

    if (!timePlan) {
      throw new StoreTimePlanNotFoundException('시간 플랜을 찾을 수 없습니다');
    }

    return timePlan;
  }

  private async checkExistName(storeId: string, name: string): Promise<void> {
    const existing = await this.prisma.storeTimePlan.findFirst({
      where: { storeId, name, deletedAt: null },
    });

    if (existing) {
      throw new StoreTimePlanNameDuplicatedException('이미 존재하는 시간 플랜 이름입니다');
    }
  }
}
