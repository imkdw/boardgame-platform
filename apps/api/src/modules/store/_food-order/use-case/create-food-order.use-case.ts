import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService, StoreValidator, StoreFoodNotFoundException } from '@repo/server-shared';
import { FOOD_ORDER_STATUS } from '@repo/consts';
import { CreateFoodOrderDto } from '../dto/create-food-order.dto';
import { FoodOrderDto } from '../dto/food-order.dto';
import { toFoodOrderDto } from '../mapper/food-order.mapper';
import { FoodOrderEventService } from '../../_sse/food-order-event.service';

@Injectable()
export class CreateFoodOrderUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storeValidator: StoreValidator,
    private readonly foodOrderEventService: FoodOrderEventService,
  ) {}

  async execute(storeId: string, dto: CreateFoodOrderDto): Promise<FoodOrderDto> {
    await this.storeValidator.checkExist(storeId);

    const orderId = randomUUID();

    // 음식 정보 조회 (가격 검증)
    const foodIds = dto.items.map((item) => item.foodId);
    const foods = await this.prisma.storeFood.findMany({
      where: {
        id: { in: foodIds },
        storeId,
        deletedAt: null,
      },
    });

    // 주문 항목 매핑
    const orderItems = dto.items.map((item) => {
      const food = foods.find((f) => f.id === item.foodId);
      if (!food) {
        throw new StoreFoodNotFoundException(`음식을 찾을 수 없습니다: ${item.foodId}`);
      }
      return {
        id: randomUUID(),
        orderId,
        foodId: food.id,
        foodName: food.name,
        quantity: item.quantity,
        unitPrice: food.price,
        totalPrice: food.price * item.quantity,
      };
    });

    const totalPrice = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const order = await this.prisma.$transaction(async (tx) => {
      const createdOrder = await tx.foodOrder.create({
        data: {
          id: orderId,
          storeId,
          roomSessionId: dto.roomSessionId,
          roomNumber: dto.roomNumber,
          status: FOOD_ORDER_STATUS.PENDING,
          totalPrice,
          items: {
            create: orderItems.map((item) => ({
              id: item.id,
              foodId: item.foodId,
              foodName: item.foodName,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: item.totalPrice,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      return createdOrder;
    });

    const orderDto = toFoodOrderDto(order);

    // SSE 이벤트 발행
    this.foodOrderEventService.emitCreated(storeId, { order: orderDto });

    return orderDto;
  }
}
