import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateStoreDeviceDto {
  @ApiProperty({ example: 'room-uuid-5678', description: '방 ID', required: false })
  @IsOptional()
  @IsString()
  roomId?: string;

  @ApiProperty({ example: '2번 방 태블릿', description: '디바이스 이름', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
