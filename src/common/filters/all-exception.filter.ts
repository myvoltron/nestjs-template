import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { WinstonLogger } from '../logger/winston-logger.serivce';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private logger: WinstonLogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const loggingObject = {
      method: request.method,
      url: request.url,
      statusCode: statusCode,
    };

    this.logger.error(JSON.stringify(loggingObject));

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
