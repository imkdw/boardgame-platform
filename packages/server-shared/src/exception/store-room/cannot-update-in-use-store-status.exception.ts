import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@repo/exception';
import { CustomException } from '../../filter/custom.exception';

export class CannotUpdateInUseStoreStatusException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.CANNOT_MODIFY_IN_USE_ROOM_STATUS,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
