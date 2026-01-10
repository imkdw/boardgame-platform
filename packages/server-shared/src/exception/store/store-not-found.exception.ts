import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@repo/exception';
import { CustomException } from '../../filter/custom.exception';

export class StoreNotFoundException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.STORE_NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
