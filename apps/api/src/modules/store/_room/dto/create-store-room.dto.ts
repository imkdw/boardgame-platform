import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, Max, MaxLength, Min } from 'class-validator';
import { IsNotEmptyString } from '@repo/server-shared';
import {
  STORE_ROOM_CAPACITY_MAX,
  STORE_ROOM_CAPACITY_MIN,
  STORE_ROOM_DESCRIPTION_MAX_LENGTH,
  STORE_ROOM_NUMBER_MIN,
  STORE_ROOM_STATUS,
  STORE_ROOM_STATUS_VALUES,
  StoreRoomStatus,
} from '@repo/consts';

export class CreateStoreRoomDto {
  @ApiProperty({ example: 1, description: '방 번호' })
  @IsInt()
  @Min(STORE_ROOM_NUMBER_MIN)
  roomNumber: number;

  @ApiProperty({ example: STORE_ROOM_STATUS.AVAILABLE, description: '방 상태', enum: STORE_ROOM_STATUS_VALUES })
  @IsIn(STORE_ROOM_STATUS_VALUES)
  status: StoreRoomStatus;

  @ApiProperty({ example: 2, description: '최소 이용자 수' })
  @IsInt()
  @Min(STORE_ROOM_CAPACITY_MIN)
  @Max(STORE_ROOM_CAPACITY_MAX)
  minCapacity: number;

  @ApiProperty({ example: 6, description: '최대 이용자 수' })
  @IsInt()
  @Min(STORE_ROOM_CAPACITY_MIN)
  @Max(STORE_ROOM_CAPACITY_MAX)
  maxCapacity: number;

  @ApiProperty({ example: '넓은 테이블이 있는 방입니다.', description: '방 소개' })
  @IsNotEmptyString()
  @MaxLength(STORE_ROOM_DESCRIPTION_MAX_LENGTH)
  description: string;
}
