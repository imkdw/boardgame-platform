import { ApiProperty } from '@nestjs/swagger';

export class StoreDto {
  @ApiProperty({ description: '매장 ID', example: 'uuid-1234-5678' })
  id: string;

  @ApiProperty({ description: '매장 이름', example: '홀리쉣보드게임 성수점' })
  name: string;

  @ApiProperty({ description: '매장 주소', example: '서울시 성동구 왕십리로 123' })
  address: string;

  @ApiProperty({ description: '와이파이 이름', example: 'HOLY_SHIT_WIFI' })
  wifiName: string;

  @ApiProperty({ description: '와이파이 비밀번호', example: 'wtf1234!' })
  wifiPassword: string;

  @ApiProperty({ description: '연락처', example: '010-1234-5678' })
  contact: string;

  @ApiProperty({ description: '매장 소개 동영상 URL', example: 'https://youtube.com/watch?v=abc123', nullable: true })
  introVideoUrl: string | null;

  @ApiProperty({ description: '위도', example: 37.5665 })
  latitude: number;

  @ApiProperty({ description: '경도', example: 126.978 })
  longitude: number;
}
