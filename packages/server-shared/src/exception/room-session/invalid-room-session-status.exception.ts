import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@repo/exception';
import { CustomException } from '../../filter/custom.exception';

export class InvalidRoomSessionStatusException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.INVALID_ROOM_SESSION_STATUS,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
