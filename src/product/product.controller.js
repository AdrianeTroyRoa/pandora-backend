import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Param,
  Bind,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
@Dependencies(ProductService)
export class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  @Get()
  getHello() {
    return this.productService.getHello();
  }

  @Get('/get-products')
  async getAllProducts() {
    return await this.productService.findAll();
    //return ['This', 'Should', 'Be', 'Seen'];
  }

  @Post('/add-product')
  @UseInterceptors(FileInterceptor('file'))
  @Bind(UploadedFile(), Body())
  async createProduct(file, payload) {
    console.log(file ?? '');
    return await this.productService.create(payload);
  }

  @Post('/hello')
  @Bind(Body())
  postGreeting(zor) {
    console.warn('This is only a test.');
    console.log(zor);
    console.error('Text like this means error (this is only eg tho)');
    return 'Data received';
  }

  @Get(':id')
  @Bind(Param('id'))
  async getProduct(id) {
    return await this.productService.findById(id);
  }
}
