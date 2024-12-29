import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { InquiryService } from './inquiry.service';

@Controller('inquiry')
@Dependencies(InquiryService)
export class InquiryController {
  constructor(inquiryService) {
    this.inquiryService = inquiryService;
  }

  @Get()
  getHello() {
    return this.inquiryService.getHello();
  }

  @Get('/get-inquiries')
  async getAllInquiry() {
    return await this.inquiryService.findAll();
  }

  @Post('/add-inquiry')
  @Bind(Body())
  async createInquiry(payload) {
    return await this.inquiryService.create(payload);
  }

  @Post('/hello')
  @Bind(Body())
  postGreeting(zor) {
    console.warn('This is only a test.');
    console.log(zor);
    console.error('Text like this means error (this is only eg tho)');
    return 'Data received';
  }
}
