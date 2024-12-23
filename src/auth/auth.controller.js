import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
@Dependencies(AuthService)
export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  @Get()
  getHello() {
    return this.authService.getHello();
  }

  @Post('/hello')
  @Bind(Body())
  postGreeting(zor) {
    console.warn("This is only a test.")
    console.log(zor);
    console.error("Text like this means error (this is only eg tho)")
    return 'Data received';
  }
}
