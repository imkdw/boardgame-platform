import { ApiProperty } from '@nestjs/swagger';
import { StoreFoodDto } from '../../_food/dto/store-food.dto';

export class StoreFoodCategoryItemDto {
  @ApiProperty({ description: '음식 정보', type: StoreFoodDto })
  food: StoreFoodDto;

  @ApiProperty({ description: '순서', example: 0 })
  order: number;
}
