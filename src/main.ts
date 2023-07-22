import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupDocument } from './common/docs/setup-document';
import { WinstonLogger } from './common/logger/winston-logger.serivce';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useLogger(app.get<WinstonLogger>(WinstonLogger));
  app.useGlobalPipes(new ValidationPipe());

  setupDocument(app);

  await app.listen(configService.get<number>('APP_PORT') || 3000);
}
bootstrap();
