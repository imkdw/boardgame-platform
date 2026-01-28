import { ApiProperty } from '@nestjs/swagger';

export class StoreDeviceDto {
  @ApiProperty({ description: '디바이스 ID', example: 'uuid-1234-5678' })
  id: string;

  @ApiProperty({ description: '매장 ID', example: 'store-uuid-1234' })
  storeId: string;

  @ApiProperty({ description: '방 ID', example: 'room-uuid-1234', nullable: true })
  roomId: string | null;

  @ApiProperty({ description: '디바이스 고유 ID', example: 'device-abc-123' })
  deviceId: string;

  @ApiProperty({ description: '디바이스 이름', example: '1번 방 태블릿', nullable: true })
  name: string | null;
}
