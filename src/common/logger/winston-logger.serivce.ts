import { Injectable, LoggerService } from '@nestjs/common';
import winston, { Logger } from 'winston';

/**
 * @summary Nest.js의 LoggerService를 구현하는 winston logger입니다.
 *
 * @description Winstonlogger는 3가지 레벨로 구성된 logger class입니다. log, error, warn 레벨로 구성되어 있습니다.
 * - log 메서드는 특이사항이 없는 일반적인 상황일 때 사용됩니다. console 출력만 담당합니다.
 * - error 메서드는 에러가 발생되었을 때 사용됩니다. 환경에 따라서 console 출력, file 출력, database 출력을 담당합니다.
 * - warn 메서드는 쓰이지 않습니다.
 */
@Injectable()
export class WinstonLogger implements LoggerService {
  private logLogger: Logger;
  private errorLogger: Logger;

  constructor() {
    this.logLogger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console({})],
    });
    this.errorLogger = winston.createLogger({
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console({})],
    });
  }

  log(message: any, ...optionalParams: any[]) {}
  error(message: any, ...optionalParams: any[]) {}
  warn(message: any, ...optionalParams: any[]) {}
}
