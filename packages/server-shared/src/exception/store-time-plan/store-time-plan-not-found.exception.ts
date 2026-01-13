import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@repo/exception';
import { CustomException } from '../../filter/custom.exception';

export class StoreTimePlanNotFoundException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.STORE_TIME_PLAN_NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
