import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { FoodOrderDto, FoodOrderItemDto } from '../dto/food-order.dto';

type FoodOrderWithItems = Prisma.FoodOrderGetPayload<{
  include: { items: true };
}>;

export function toFoodOrderDto(order: FoodOrderWithItems): FoodOrderDto {
  return plainToInstance(FoodOrderDto, {
    id: order.id,
    storeId: order.storeId,
    roomSessionId: order.roomSessionId,
    roomNumber: order.roomNumber,
    status: order.status,
    totalPrice: order.totalPrice,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items: order.items.map((item) =>
      plainToInstance(FoodOrderItemDto, {
        id: item.id,
        orderId: item.orderId,
        foodId: item.foodId,
        foodName: item.foodName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      }),
    ),
  });
}
