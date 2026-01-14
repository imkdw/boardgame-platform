import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { FOOD_ORDER_STATUS_VALUES, type FoodOrderStatus } from '@repo/consts';

export class UpdateFoodOrderStatusDto {
  @ApiProperty({
    example: 'READY',
    description: '변경할 주문 상태',
    enum: FOOD_ORDER_STATUS_VALUES,
  })
  @IsIn(FOOD_ORDER_STATUS_VALUES)
  status: FoodOrderStatus;
}
