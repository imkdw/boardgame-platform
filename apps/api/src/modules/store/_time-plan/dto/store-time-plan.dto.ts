import { ApiProperty } from '@nestjs/swagger';

export class StoreTimePlanDto {
  @ApiProperty({ description: '시간 플랜 ID', example: 'uuid-1234-5678' })
  id: string;

  @ApiProperty({ description: '매장 ID', example: 'store-uuid-1234' })
  storeId: string;

  @ApiProperty({ description: '시간 플랜 이름', example: '2시간' })
  name: string;

  @ApiProperty({ description: '이용 시간 (분 단위, 최소 30분)', example: 120 })
  durationMinutes: number;

  @ApiProperty({ description: '가격 (원)', example: 7000 })
  price: number;

  @ApiProperty({ description: '추천 플랜 여부', example: true })
  isRecommended: boolean;

  @ApiProperty({ description: '정렬 순서', example: 1 })
  sort: number;

  @ApiProperty({ description: '생성 일시', example: '2026-01-13T12:00:00.000Z' })
  createdAt: Date;
}
