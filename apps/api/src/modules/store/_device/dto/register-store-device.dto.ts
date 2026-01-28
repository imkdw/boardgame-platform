import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { IsNotEmptyString } from '@repo/server-shared';

export class RegisterStoreDeviceDto {
  @ApiProperty({ example: 'device-abc-123', description: '디바이스 고유 ID' })
  @IsNotEmptyString()
  deviceId: string;

  @ApiProperty({ example: 'room-uuid-1234', description: '방 ID', required: false })
  @IsOptional()
  @IsString()
  roomId?: string;

  @ApiProperty({ example: '1번 방 태블릿', description: '디바이스 이름', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
