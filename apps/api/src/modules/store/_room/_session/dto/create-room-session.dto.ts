import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Max, Min } from 'class-validator';
import { ROOM_SESSION_PEOPLE_COUNT_MIN, ROOM_SESSION_PEOPLE_COUNT_MAX } from '@repo/consts';

export class CreateRoomSessionDto {
  @ApiProperty({ example: 'uuid-1234-5678', description: '시간 플랜 ID' })
  @IsUUID()
  timePlanId: string;

  @ApiProperty({ example: 4, description: '인원수 (1~20명)' })
  @IsInt()
  @Min(ROOM_SESSION_PEOPLE_COUNT_MIN)
  @Max(ROOM_SESSION_PEOPLE_COUNT_MAX)
  peopleCount: number;
}
