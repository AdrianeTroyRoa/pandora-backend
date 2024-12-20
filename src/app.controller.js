import { Controller, Dependencies, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@Dependencies(AppService)
export class AppController {
  constructor(appService) {
    this.appService = appService;
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/fuck')
  letsFuck() {
    return this.appService.getFucked();
  }

  @Get('/greet')
  getGreeting(){
    const greeting = `good day!`
    return greeting;
  }
}
