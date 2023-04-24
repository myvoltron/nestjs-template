import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { CONFIG_OPTIONS_PROVIDER } from './common/config/config-options.service';
import { TypeOrmConfigService } from './common/config/typeorm-config.service';
import { WinstonConfigService } from './common/logger/winston-config.service';
import { CatsModule } from './modules/cats/cats.module';

@Module({
  imports: [
    ConfigModule.forRoot(CONFIG_OPTIONS_PROVIDER),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useClass: WinstonConfigService,
    }),
    CatsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
