import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { IsNotEmptyString } from '@repo/server-shared';

export class CreateFoodOrderItemDto {
  @ApiProperty({ example: 'food-uuid', description: '음식 ID' })
  @IsNotEmptyString()
  foodId: string;

  @ApiProperty({ example: 2, description: '수량' })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateFoodOrderDto {
  @ApiProperty({ example: 'room-session-uuid', description: '방 세션 ID (선택)', nullable: true })
  @IsNotEmptyString({ nullable: true })
  roomSessionId: string | null;

  @ApiProperty({ example: 1, description: '방 번호' })
  @IsInt()
  @Min(1)
  roomNumber: number;

  @ApiProperty({
    type: [CreateFoodOrderItemDto],
    description: '주문 항목 목록',
    example: [
      { foodId: 'food-uuid-1', quantity: 2 },
      { foodId: 'food-uuid-2', quantity: 1 },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateFoodOrderItemDto)
  items: CreateFoodOrderItemDto[];
}
