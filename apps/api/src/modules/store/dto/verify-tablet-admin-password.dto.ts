import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyString } from '@repo/server-shared';

export class VerifyTabletAdminPasswordDto {
  @ApiProperty({ example: '1234', description: '검증할 태블릿 관리자 비밀번호' })
  @IsNotEmptyString()
  password: string;
}

export class VerifyTabletAdminPasswordResponseDto {
  @ApiProperty({ example: true, description: '비밀번호 일치 여부' })
  valid: boolean;
}
