import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, MaxLength } from 'class-validator';
import { IsNotEmptyString } from '@repo/server-shared';
import {
  STORE_NAME_MAX_LENGTH,
  STORE_ADDRESS_MAX_LENGTH,
  STORE_WIFI_NAME_MAX_LENGTH,
  STORE_WIFI_PASSWORD_MAX_LENGTH,
  STORE_CONTACT_MAX_LENGTH,
} from '@repo/consts';

export class UpdateStoreDto {
  @ApiProperty({ example: '보드게임 카페 1호점' })
  @IsNotEmptyString()
  @MaxLength(STORE_NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({ example: '서울시 강남구 테헤란로 123' })
  @IsNotEmptyString()
  @MaxLength(STORE_ADDRESS_MAX_LENGTH)
  address: string;

  @ApiProperty({ example: 'BoardGame_Cafe_5G' })
  @IsNotEmptyString()
  @MaxLength(STORE_WIFI_NAME_MAX_LENGTH)
  wifiName: string;

  @ApiProperty({ example: 'cafe1234!' })
  @IsNotEmptyString()
  @MaxLength(STORE_WIFI_PASSWORD_MAX_LENGTH)
  wifiPassword: string;

  @ApiProperty({ example: '02-1234-5678' })
  @IsNotEmptyString()
  @MaxLength(STORE_CONTACT_MAX_LENGTH)
  contact: string;

  @ApiProperty({ example: 'https://youtube.com/watch?v=abc123', nullable: true })
  @IsNotEmptyString({ nullable: true })
  introVideoUrl: string | null;

  @ApiProperty({ example: 37.5665, description: '위도' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 126.978, description: '경도' })
  @IsNumber()
  longitude: number;
}
