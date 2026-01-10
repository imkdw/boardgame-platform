import { ApiProperty } from '@nestjs/swagger';

export class StoreFoodCategoryDto {
  @ApiProperty({ description: '카테고리 ID', example: 'uuid-1234-5678' })
  id: string;

  @ApiProperty({ description: '매장 ID', example: 'store-uuid-1234' })
  storeId: string;

  @ApiProperty({ description: '카테고리 이름', example: '피자' })
  name: string;
}
