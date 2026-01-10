import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@repo/exception';
import { CustomException } from '../../filter/custom.exception';

export class ExistStoreGameNameException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.STORE_GAME_NAME_DUPLICATED,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
