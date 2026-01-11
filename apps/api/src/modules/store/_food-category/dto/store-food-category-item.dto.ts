import { ApiProperty } from '@nestjs/swagger';
import { StoreFoodDto } from '../../_food/dto/store-food.dto';

export class StoreFoodCategoryItemDto extends StoreFoodDto {
  @ApiProperty({ description: '순서', example: 0 })
  order: number;
}
