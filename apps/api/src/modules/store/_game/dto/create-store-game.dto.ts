import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsIn, IsInt, IsString, Max, MaxLength, Min } from 'class-validator';
import { IsNotEmptyString } from '@repo/server-shared';
import {
  STORE_GAME_NAME_MAX_LENGTH,
  STORE_GAME_DESCRIPTION_MAX_LENGTH,
  STORE_GAME_RULES_MAX_LENGTH,
  STORE_GAME_MIN_PLAYERS,
  STORE_GAME_MAX_PLAYERS,
  STORE_GAME_MIN_PLAY_TIME,
  STORE_GAME_MAX_PLAY_TIME,
  GAME_DIFFICULTY_VALUES,
  GameDifficulty,
} from '@repo/consts';

export class CreateStoreGameDto {
  @ApiProperty({ example: '스플렌더', description: '게임 이름' })
  @IsNotEmptyString()
  @MaxLength(STORE_GAME_NAME_MAX_LENGTH)
  name: string;

  @ApiProperty({ example: 'https://example.com/thumbnail.jpg', description: '썸네일 URL', nullable: true })
  @IsNotEmptyString({ nullable: true })
  thumbnail: string | null;

  @ApiProperty({ example: ['https://example.com/img1.jpg'], description: '게임 이미지 URL 배열' })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ example: 2, description: '최소 플레이어 수' })
  @IsInt()
  @Min(STORE_GAME_MIN_PLAYERS)
  @Max(STORE_GAME_MAX_PLAYERS)
  minPlayers: number;

  @ApiProperty({ example: 4, description: '최대 플레이어 수' })
  @IsInt()
  @Min(STORE_GAME_MIN_PLAYERS)
  @Max(STORE_GAME_MAX_PLAYERS)
  maxPlayers: number;

  @ApiProperty({ example: 30, description: '플레이 시간 (분)' })
  @IsInt()
  @Min(STORE_GAME_MIN_PLAY_TIME)
  @Max(STORE_GAME_MAX_PLAY_TIME)
  playTime: number;

  @ApiProperty({ example: 'medium', description: '난이도', enum: GAME_DIFFICULTY_VALUES })
  @IsIn(GAME_DIFFICULTY_VALUES)
  difficulty: GameDifficulty;

  @ApiProperty({ example: ['전략', '보석'], description: '장르 배열' })
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @ApiProperty({ example: true, description: '추천 여부' })
  @IsBoolean()
  isRecommended: boolean;

  @ApiProperty({ example: 3, description: '총 재고' })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 2, description: '이용 가능 재고' })
  @IsInt()
  @Min(0)
  availableStock: number;

  @ApiProperty({ example: '보석을 모아 귀족의 후원을 받는 전략 게임입니다.', description: '게임 설명' })
  @IsNotEmptyString()
  @MaxLength(STORE_GAME_DESCRIPTION_MAX_LENGTH)
  description: string;

  @ApiProperty({ example: '1. 보석 토큰을 모읍니다...', description: '게임 규칙' })
  @IsNotEmptyString()
  @MaxLength(STORE_GAME_RULES_MAX_LENGTH)
  rules: string;

  @ApiProperty({ example: 'https://youtube.com/watch?v=xxx', description: '게임 영상 URL', nullable: true })
  @IsNotEmptyString({ nullable: true })
  videoUrl: string | null;
}
