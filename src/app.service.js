import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { greeting: 'Hello World!' };
  }
  getFucked() {
    return { greeting: 'FUCK YOU' };
  }
}
