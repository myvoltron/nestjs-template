import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { setupDocument } from './common/docs/setup-document';
import { WinstonLogger } from './common/logger/winston-logger.serivce';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  Sentry.init({
    dsn: configService.get<string>('SENTRY_DSN'),
  });

  app.useLogger(app.get<WinstonLogger>(WinstonLogger));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  setupDocument(app);

  await app.listen(configService.get<number>('APP_PORT') || 3000);
}
bootstrap();
