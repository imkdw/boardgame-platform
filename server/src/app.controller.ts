import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  ping(): string {
    return 'nestjs-socket.io-docs';
  }
}
