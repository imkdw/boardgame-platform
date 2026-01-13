import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@repo/exception';
import { CustomException } from '../../filter/custom.exception';

export class RoomAlreadyInUseException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.ROOM_ALREADY_IN_USE,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
