import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupDocument(
  app: INestApplication,
  configService: ConfigService,
): void {
  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('DOCS_TITLE'))
    .setDescription(configService.get<string>('DOCS_DESCRIPTION'))
    .setVersion(configService.get<string>('DOCS_VERSION'))
    .addTag(configService.get<string>('DOCS_TAG'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
