import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { TransformToInt, TransformToBoolean, TransformToArray } from '@repo/server-shared';
import { GAME_DIFFICULTY_VALUES, GAME_SORT_BY_VALUES, GameDifficulty, GameSortBy } from '@repo/consts';

export class FindStoreGamesQueryDto {
  @ApiPropertyOptional({ example: '스플렌더', description: '검색어 (게임 이름)' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 2, description: '플레이 인원수 (해당 인원으로 플레이 가능한 게임)' })
  @IsOptional()
  @TransformToInt()
  @IsInt()
  @Min(1)
  playerCount?: number;

  @ApiPropertyOptional({ example: ['전략', '파티'], description: '장르 (복수 선택 가능)' })
  @IsOptional()
  @TransformToArray()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @ApiPropertyOptional({ example: 'medium', description: '난이도', enum: GAME_DIFFICULTY_VALUES })
  @IsOptional()
  @IsIn(GAME_DIFFICULTY_VALUES)
  difficulty?: GameDifficulty;

  @ApiPropertyOptional({ example: 30, description: '최소 플레이 시간 (분)' })
  @IsOptional()
  @TransformToInt()
  @IsInt()
  @Min(0)
  minPlayTime?: number;

  @ApiPropertyOptional({ example: 60, description: '최대 플레이 시간 (분)' })
  @IsOptional()
  @TransformToInt()
  @IsInt()
  @Min(0)
  maxPlayTime?: number;

  @ApiPropertyOptional({ example: true, description: '대여 가능한 게임만' })
  @IsOptional()
  @TransformToBoolean()
  @IsBoolean()
  availableOnly?: boolean;

  @ApiPropertyOptional({ example: true, description: '추천 게임만' })
  @IsOptional()
  @TransformToBoolean()
  @IsBoolean()
  recommendedOnly?: boolean;

  @ApiPropertyOptional({ example: 'recommended', description: '정렬 기준', enum: GAME_SORT_BY_VALUES })
  @IsOptional()
  @IsIn(GAME_SORT_BY_VALUES)
  sortBy?: GameSortBy;
}
