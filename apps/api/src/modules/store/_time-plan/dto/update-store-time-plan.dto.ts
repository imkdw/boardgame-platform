import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, Max, MaxLength, Min } from 'class-validator';
import { IsNotEmptyString } from '@repo/server-shared';
import {
  STORE_TIME_PLAN_NAME_MAX_LENGTH,
  STORE_TIME_PLAN_DURATION_MIN,
  STORE_TIME_PLAN_DURATION_MAX,
  STORE_TIME_PLAN_PRICE_MIN,
  STORE_TIME_PLAN_PRICE_MAX,
} from '@repo/consts';

export class UpdateStoreTimePlanDto {
  @ApiProperty({ example: '2시간', description: '시간 플랜 이름' })
  @IsNotEmptyString()
  @MaxLength(STORE_TIME_PLAN_NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({ example: 120, description: '이용 시간 (분 단위, 최소 30분)' })
  @IsInt()
  @Min(STORE_TIME_PLAN_DURATION_MIN)
  @Max(STORE_TIME_PLAN_DURATION_MAX)
  durationMinutes: number;

  @ApiProperty({ example: 7000, description: '가격 (원)' })
  @IsInt()
  @Min(STORE_TIME_PLAN_PRICE_MIN)
  @Max(STORE_TIME_PLAN_PRICE_MAX)
  price: number;

  @ApiProperty({ example: true, description: '추천 플랜 여부' })
  @IsBoolean()
  isRecommended: boolean;

  @ApiProperty({ example: 1, description: '정렬 순서' })
  @IsInt()
  @Min(0)
  sort: number;
}
