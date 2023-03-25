import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { CONFIG_OPTIONS_PROVIDER } from './common/config/config-options.service';
import { TypeOrmConfigService } from './common/config/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_OPTIONS_PROVIDER),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
