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

  @Get('/get-users')
  async getAllUsers() {
    return await this.authService.findAll();
  }

  @Post('/create-user')
  @Bind(Body())
  async createUser(payload) {
    return await this.authService.create(payload)
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
