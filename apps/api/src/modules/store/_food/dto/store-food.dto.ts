import { ApiProperty } from '@nestjs/swagger';

export class StoreFoodDto {
  @ApiProperty({ description: '음식 ID', example: 'uuid-1234-5678' })
  id: string;

  @ApiProperty({ description: '매장 ID', example: 'store-uuid-1234' })
  storeId: string;

  @ApiProperty({ description: '음식 이름', example: '치즈 피자' })
  name: string;

  @ApiProperty({ description: '음식 설명', example: '모짜렐라 치즈가 듬뿍 들어간 피자' })
  description: string;

  @ApiProperty({ description: '가격 (원)', example: 15000 })
  price: number;

  @ApiProperty({ description: '인기메뉴 여부', example: false })
  isPopular: boolean;

  @ApiProperty({ description: '신메뉴 여부', example: true })
  isNew: boolean;

  @ApiProperty({
    description: '음식 사진 URL',
    example: 'https://example.com/images/pizza.jpg',
    nullable: true,
  })
  imageUrl: string | null;
}
