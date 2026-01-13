import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@repo/exception';
import { CustomException } from '../../filter/custom.exception';

export class StoreTimePlanNameDuplicatedException extends CustomException {
  constructor(message: string) {
    super({
      message,
      errorCode: EXCEPTION_CODES.STORE_TIME_PLAN_NAME_DUPLICATED,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
