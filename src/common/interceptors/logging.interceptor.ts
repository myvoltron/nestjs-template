import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { WinstonLogger } from 'src/common/logger/winston-logger.serivce';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: WinstonLogger) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        const loggingObject = {
          method: request.method,
          url: request.url,
          statusCode: response.statusCode,
          executionTime: `${Date.now() - now}ms`,
        };

        this.logger.log(JSON.stringify(loggingObject));
      }),
    );
  }
}
