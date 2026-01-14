import { Injectable } from '@nestjs/common';
import { PrismaService, StoreValidator } from '@repo/server-shared';
import type { FoodOrderStatus } from '@repo/consts';
import { FoodOrderDto } from '../dto/food-order.dto';
import { toFoodOrderDto } from '../mapper/food-order.mapper';

@Injectable()
export class FindFoodOrdersUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
  ) {}

  async execute(storeId: string, status?: FoodOrderStatus): Promise<FoodOrderDto[]> {
    await this.storeValidator.checkExist(storeId);

    const orders = await this.prisma.foodOrder.findMany({
      where: {
        storeId,
        ...(status && { status }),
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders.map(toFoodOrderDto);
  }
}
