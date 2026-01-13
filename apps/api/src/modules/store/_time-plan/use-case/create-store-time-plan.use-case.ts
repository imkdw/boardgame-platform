import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import { StoreTimePlanNameDuplicatedException } from '@repo/server-shared';
import { CreateStoreTimePlanDto } from '../dto/create-store-time-plan.dto';
import { StoreTimePlanDto } from '../dto/store-time-plan.dto';
import { toStoreTimePlanDto } from '../mapper/store-time-plan.mapper';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateStoreTimePlanUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
  ) {}

  async execute(storeId: string, dto: CreateStoreTimePlanDto): Promise<StoreTimePlanDto> {
    await this.storeValidator.checkExist(storeId);
    await this.checkExistName(storeId, dto.name);

    const timePlan = await this.prisma.$transaction(async (tx) => {
      // 기존 시간 플랜들의 sort를 1씩 증가
      await tx.storeTimePlan.updateMany({
        where: { storeId, deletedAt: null },
        data: { sort: { increment: 1 } },
      });

      // 새 시간 플랜은 sort=1로 생성
      return tx.storeTimePlan.create({
        data: {
          id: randomUUID(),
          storeId,
          name: dto.name,
          durationMinutes: dto.durationMinutes,
          price: dto.price,
          isRecommended: dto.isRecommended ?? false,
          sort: 1,
        },
      });
    });

    return toStoreTimePlanDto(timePlan);
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
