import { ApiProperty } from '@nestjs/swagger';
import { STORE_ROOM_STATUS, StoreRoomStatus } from '@repo/consts';

const STORE_ROOM_STATUS_VALUES = Object.values(STORE_ROOM_STATUS);

export class StoreRoomDto {
  @ApiProperty({ description: '방 ID', example: 'uuid-1234-5678' })
  id: string;

  @ApiProperty({ description: '매장 ID', example: 'store-uuid-1234' })
  storeId: string;

  @ApiProperty({ description: '방 번호', example: 1 })
  roomNumber: number;

  @ApiProperty({ description: '방 상태', example: 'AVAILABLE', enum: STORE_ROOM_STATUS_VALUES })
  status: StoreRoomStatus;

  @ApiProperty({ description: '최소 이용자 수', example: 2 })
  minCapacity: number;

  @ApiProperty({ description: '최대 이용자 수', example: 6 })
  maxCapacity: number;

  @ApiProperty({ description: '방 소개', example: '넓은 테이블이 있는 방입니다.' })
  description: string;
}
