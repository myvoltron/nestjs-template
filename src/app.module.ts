import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CONFIG_OPTIONS_PROVIDER } from './common/config/config-options.service';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_OPTIONS_PROVIDER),
  imports: [],
  ],
  controllers: [AppController],
})
export class AppModule {}
