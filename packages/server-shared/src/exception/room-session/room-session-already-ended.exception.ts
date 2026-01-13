import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@repo/exception';
import { CustomException } from '../../filter/custom.exception';

export class RoomSessionAlreadyEndedException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.ROOM_SESSION_ALREADY_ENDED,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
