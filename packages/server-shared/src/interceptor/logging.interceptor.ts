import { CallHandler, ExecutionContext, HttpStatus, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { getClientIp } from 'request-ip';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Logger } from 'winston';

import { LOG_LEVEL, LogLevel } from '../logger';

interface RequestLog {
  timestamp: string;
  method: string;
  url: string;
  ip: string;
  statusCode: number;
  responseTime: string;
  error?: string;
  stack?: string;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { method, url } = request;
    const startTime = Date.now();
    const clientIp = getClientIp(request) ?? 'unknown';

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - startTime;
        const statusCode = response.statusCode;

        const logData: RequestLog = {
          timestamp: new Date().toISOString(),
          method,
          url,
          ip: clientIp,
          statusCode,
          responseTime: `${responseTime}ms`,
        };

        this.logger.log(this.getLogLevel(statusCode), JSON.stringify(logData, null, 2));
      }),
      catchError((error: Error) => {
        const responseTime = Date.now() - startTime;
        const statusCode = response.statusCode >= 400 ? response.statusCode : 500;

        const logData: RequestLog = {
          timestamp: new Date().toISOString(),
          method,
          url,
          ip: clientIp,
          statusCode,
          responseTime: `${responseTime}ms`,
          error: error.message,
          stack: error.stack,
        };

        this.logger.error(JSON.stringify(logData, null, 2));

        return throwError(() => error);
      })
    );
  }

  private getLogLevel(statusCode: number): LogLevel {
    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      return LOG_LEVEL.ERROR;
    }

    if (statusCode >= HttpStatus.BAD_REQUEST) {
      return LOG_LEVEL.WARN;
    }

    return LOG_LEVEL.INFO;
  }
}
