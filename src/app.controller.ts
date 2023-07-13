import { Controller, Get } from '@nestjs/common';
import { AppPath } from './app.constant';

@Controller()
export class AppController {
  @Get(AppPath.HeartBeat)
  getHeartbeat() {
    return;
  }
}
