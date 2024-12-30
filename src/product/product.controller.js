import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { ProductService } from './product.service';

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
  @Bind(Body())
  async createProduct(payload) {
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
}
