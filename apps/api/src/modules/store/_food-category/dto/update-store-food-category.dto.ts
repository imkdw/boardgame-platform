import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';
import { IsNotEmptyString } from '@repo/server-shared';
import { STORE_FOOD_CATEGORY_NAME_MAX_LENGTH } from '@repo/consts';

export class UpdateStoreFoodCategoryDto {
  @ApiProperty({ example: '파스타', description: '카테고리 이름' })
  @IsNotEmptyString()
  @MaxLength(STORE_FOOD_CATEGORY_NAME_MAX_LENGTH)
  name: string;
}
