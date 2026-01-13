import { ApiProperty } from '@nestjs/swagger';

export class TimePlanSummaryDto {
  @ApiProperty({ description: '시간 플랜 ID', example: 'uuid-1234-5678' })
  id: string;

  @ApiProperty({ description: '시간 플랜 이름', example: '2시간' })
  name: string;

  @ApiProperty({ description: '이용 시간 (분 단위)', example: 120 })
  durationMinutes: number;
}

export class RoomSessionDto {
  @ApiProperty({ description: '세션 ID', example: 'uuid-1234-5678' })
  id: string;

  @ApiProperty({ description: '매장 ID', example: 'store-uuid-1234' })
  storeId: string;

  @ApiProperty({ description: '방 ID', example: 'room-uuid-1234' })
  roomId: string;

  @ApiProperty({ description: '시간 플랜 ID', example: 'plan-uuid-1234' })
  timePlanId: string;

  @ApiProperty({ description: '인원수', example: 4 })
  peopleCount: number;

  @ApiProperty({ description: '세션 상태', example: 'ACTIVE' })
  status: string;

  @ApiProperty({ description: '시작 시간', example: '2026-01-13T12:00:00.000Z' })
  startedAt: Date;

  @ApiProperty({ description: '종료 시간', example: '2026-01-13T14:00:00.000Z', nullable: true })
  endedAt: Date | null;

  @ApiProperty({ description: '예정 종료 시간', example: '2026-01-13T14:00:00.000Z' })
  scheduledEndAt: Date;

  @ApiProperty({ description: '총 가격', example: 28000 })
  totalPrice: number;

  @ApiProperty({ description: '시간 플랜 정보', type: TimePlanSummaryDto, required: false })
  timePlan?: TimePlanSummaryDto;
}
