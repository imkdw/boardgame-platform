import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator, FoodOrderNotFoundException } from '@repo/server-shared';
import { UpdateFoodOrderStatusDto } from '../dto/update-food-order-status.dto';
import { FoodOrderEventService } from '../../_sse/food-order-event.service';

@Injectable()
export class UpdateFoodOrderStatusUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly foodOrderEventService: FoodOrderEventService,
  ) {}

  async execute(storeId: string, orderId: string, dto: UpdateFoodOrderStatusDto): Promise<void> {
    await this.storeValidator.checkExist(storeId);

    const order = await this.prisma.foodOrder.findFirst({
      where: {
        id: orderId,
        storeId,
      },
    });

    if (!order) {
      throw new FoodOrderNotFoundException(`주문을 찾을 수 없습니다: ${orderId}`);
    }

    const updatedOrder = await this.prisma.foodOrder.update({
      where: { id: orderId },
      data: { status: dto.status },
    });

    // SSE 이벤트 발행
    this.foodOrderEventService.emitStatusChanged(storeId, {
      orderId,
      status: dto.status,
      updatedAt: updatedOrder.updatedAt.toISOString(),
    });
  }
}
