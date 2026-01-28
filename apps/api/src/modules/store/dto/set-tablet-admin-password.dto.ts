import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyString } from '@repo/server-shared';
import { MaxLength, MinLength } from 'class-validator';

export class SetTabletAdminPasswordDto {
  @ApiProperty({ example: '1234', description: '태블릿 관리자 비밀번호 (4-20자)' })
  @IsNotEmptyString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
