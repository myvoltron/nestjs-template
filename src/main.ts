import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupDocument } from './common/docs/setup-document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  setupDocument(app, configService);

  await app.listen(configService.get<number>('APP_PORT') || 3000);
}
bootstrap();
