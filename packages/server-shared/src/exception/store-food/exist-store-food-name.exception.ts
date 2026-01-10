import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@repo/exception';
import { CustomException } from '../../filter/custom.exception';

export class ExistStoreFoodNameException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.STORE_FOOD_NAME_DUPLICATED,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
