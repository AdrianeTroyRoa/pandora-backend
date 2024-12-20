import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'Hello World!';
  }
  getFucked() {
    return 'FUCK YOU';
  }
}
