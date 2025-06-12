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
import multer from 'multer';
import fs from 'fs';

//file upload
const uploadFolder = './uploads';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // Save to ./uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const uploadOptions = {
  storage: storage,
};

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
  @UseInterceptors(FileInterceptor('file', uploadOptions))
  @Bind(UploadedFile(), Body())
  async createProduct(file, payload) {
    console.log(file.filename, 'uploaded successfully' ?? '');
    return await this.productService.create(file.filename, payload.payload);
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
