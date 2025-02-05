import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, InquiryModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
