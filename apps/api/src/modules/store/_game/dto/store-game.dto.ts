import { ApiProperty } from '@nestjs/swagger';
import { GAME_DIFFICULTY_VALUES, GameDifficulty } from '@repo/consts';

export class StoreGameDto {
  @ApiProperty({ description: '게임 ID', example: 'uuid-1234-5678' })
  id: string;

  @ApiProperty({ description: '매장 ID', example: 'store-uuid-1234' })
  storeId: string;

  @ApiProperty({ description: '게임 이름', example: '스플렌더' })
  name: string;

  @ApiProperty({ description: '썸네일 URL', example: 'https://example.com/thumbnail.jpg', nullable: true })
  thumbnail: string | null;

  @ApiProperty({ description: '게임 이미지 URL 배열', example: ['https://example.com/img1.jpg'] })
  images: string[];

  @ApiProperty({ description: '최소 플레이어 수', example: 2 })
  minPlayers: number;

  @ApiProperty({ description: '최대 플레이어 수', example: 4 })
  maxPlayers: number;

  @ApiProperty({ description: '플레이 시간 (분)', example: 30 })
  playTime: number;

  @ApiProperty({ description: '난이도', enum: GAME_DIFFICULTY_VALUES, example: 'medium' })
  difficulty: GameDifficulty;

  @ApiProperty({ description: '장르 배열', example: ['전략', '보석'] })
  genres: string[];

  @ApiProperty({ description: '추천 여부', example: true })
  isRecommended: boolean;

  @ApiProperty({ description: '총 재고', example: 3 })
  stock: number;

  @ApiProperty({ description: '이용 가능 재고', example: 2 })
  availableStock: number;

  @ApiProperty({ description: '게임 설명', example: '보석을 모아 귀족의 후원을 받는 전략 게임입니다.' })
  description: string;

  @ApiProperty({ description: '게임 규칙', example: '1. 보석 토큰을 모읍니다...' })
  rules: string;

  @ApiProperty({ description: '게임 영상 URL', example: 'https://youtube.com/watch?v=xxx', nullable: true })
  videoUrl: string | null;
}
