import { ApiProperty } from '@nestjs/swagger';
import { FOOD_ORDER_STATUS_VALUES, type FoodOrderStatus } from '@repo/consts';

export class FoodOrderItemDto {
  @ApiProperty({ description: '주문 항목 ID', example: 'item-uuid' })
  id: string;

  @ApiProperty({ description: '주문 ID', example: 'order-uuid' })
  orderId: string;

  @ApiProperty({ description: '음식 ID', example: 'food-uuid' })
  foodId: string;

  @ApiProperty({ description: '음식 이름', example: '마라탕' })
  foodName: string;

  @ApiProperty({ description: '수량', example: 2 })
  quantity: number;

  @ApiProperty({ description: '단가 (원)', example: 12000 })
  unitPrice: number;

  @ApiProperty({ description: '항목 총 가격 (원)', example: 24000 })
  totalPrice: number;
}

export class FoodOrderDto {
  @ApiProperty({ description: '주문 ID', example: 'order-uuid' })
  id: string;

  @ApiProperty({ description: '매장 ID', example: 'store-uuid' })
  storeId: string;

  @ApiProperty({ description: '방 세션 ID', example: 'session-uuid', nullable: true })
  roomSessionId: string | null;

  @ApiProperty({ description: '방 번호', example: 1 })
  roomNumber: number;

  @ApiProperty({ description: '주문 상태', enum: FOOD_ORDER_STATUS_VALUES, example: 'PENDING' })
  status: FoodOrderStatus;

  @ApiProperty({ description: '총 가격 (원)', example: 45000 })
  totalPrice: number;

  @ApiProperty({ description: '생성 일시', example: '2024-01-15T10:30:00Z' })
  createdAt: string;

  @ApiProperty({ description: '수정 일시', example: '2024-01-15T10:35:00Z' })
  updatedAt: string;

  @ApiProperty({ type: [FoodOrderItemDto], description: '주문 항목 목록' })
  items: FoodOrderItemDto[];
}
