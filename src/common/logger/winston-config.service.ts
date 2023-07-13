import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { utilities, WinstonModuleOptionsFactory } from 'nest-winston';
import { Env } from 'src/app.constant';
import * as winston from 'winston';
import { format, LoggerOptions } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  private readonly rotateLoggerFormat: any;
  private readonly rotateOptions: any;

  private projectName: string;
  private environment: string;

  constructor(private configService: ConfigService) {
    this.projectName = this.configService.get<string>('PROJECT_NAME');
    this.environment = this.configService.get<string>('ENV');

    this.rotateLoggerFormat = format.combine(
      format.label({ label: this.projectName }),
      format.timestamp(),
      format.json(),
    );
    this.rotateOptions = {
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      maxSize: '100m',
      utc: true,
    };
  }

  createWinstonModuleOptions(): LoggerOptions {
    return {
      transports: [
        new winston.transports.Console({
          format:
            this.environment === Env.Production
              ? format.simple()
              : format.combine(
                  format.timestamp(),
                  utilities.format.nestLike(this.projectName, {
                    colors: true,
                    prettyPrint: true,
                  }),
                ),
        }),
        new DailyRotateFile({
          format: this.rotateLoggerFormat,
          level: 'info',
          filename: `./logs/%DATE%-${this.projectName}.log`,
          ...this.rotateOptions,
        }),
        new DailyRotateFile({
          format: this.rotateLoggerFormat,
          level: 'error',
          filename: `./logs/%DATE%-${this.projectName}-error.log`,
          ...this.rotateOptions,
        }),
      ],
    };
  }
}
