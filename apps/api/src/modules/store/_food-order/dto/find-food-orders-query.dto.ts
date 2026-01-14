import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsIn } from 'class-validator';
import { FOOD_ORDER_STATUS_VALUES, type FoodOrderStatus } from '@repo/consts';

export class FindFoodOrdersQueryDto {
  @ApiProperty({
    description: '주문 상태 필터 (선택)',
    enum: FOOD_ORDER_STATUS_VALUES,
    required: false,
    example: 'PENDING',
  })
  @IsOptional()
  @IsIn(FOOD_ORDER_STATUS_VALUES)
  status?: FoodOrderStatus;
}
