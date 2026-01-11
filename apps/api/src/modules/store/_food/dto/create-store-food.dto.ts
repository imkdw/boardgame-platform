import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, MaxLength, Min } from 'class-validator';
import { IsNotEmptyString } from '@repo/server-shared';
import { STORE_FOOD_NAME_MAX_LENGTH, STORE_FOOD_DESCRIPTION_MAX_LENGTH } from '@repo/consts';

export class CreateStoreFoodDto {
  @ApiProperty({ example: '치즈 피자', description: '음식 이름' })
  @IsNotEmptyString()
  @MaxLength(STORE_FOOD_NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({ example: '모짜렐라 치즈가 듬뿍 들어간 피자', description: '음식 설명' })
  @IsNotEmptyString()
  @MaxLength(STORE_FOOD_DESCRIPTION_MAX_LENGTH)
  description: string;

  @ApiProperty({ example: 15000, description: '가격 (원)' })
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty({ example: false, description: '인기메뉴 여부' })
  @IsBoolean()
  isPopular: boolean;

  @ApiProperty({ example: true, description: '신메뉴 여부' })
  @IsBoolean()
  isNew: boolean;

  @ApiProperty({
    example: 'https://example.com/images/pizza.jpg',
    description: '음식 사진 URL',
    nullable: true,
  })
  @IsNotEmptyString({ nullable: true })
  imageUrl: string | null;

  @ApiProperty({ example: 'uuid-string', description: '음식 카테고리 ID' })
  @IsNotEmptyString()
  categoryId: string;
}
