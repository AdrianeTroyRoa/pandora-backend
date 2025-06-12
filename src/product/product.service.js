import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '../../node_modules/@prisma/client/runtime/library';

const db = new PrismaClient();

@Injectable()
export class ProductService {
  getHello() {
    return 'Hello Product World!';
  }

  async create(fileName, newProduct) {
    console.info('Creating product entry...');

    let parsedNewProduct = JSON.parse(newProduct);
    parsedNewProduct = { ...parsedNewProduct, image_src: fileName };
    for (const i of Object.keys(parsedNewProduct)) {
      console.log(`${i}: ${parsedNewProduct[i]}`);
    }
    //saving product info to database
    try {
      await db.product.create({
        data: {
          name: parsedNewProduct.name,
          num_left: parsedNewProduct.num_left,
          description: parsedNewProduct.description,
          image_src: parsedNewProduct.image_src,
        },
      });
      await db.$disconnect();
      console.info('Product created');
      return 'Product created';
    } catch (err) {
      console.error(err);
      await db.$disconnect();
      if (err instanceof PrismaClientKnownRequestError)
        throw new HttpException(
          'Product already exists. Cannot create.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      else if (err instanceof PrismaClientInitializationError)
        throw new HttpException(
          'Database is possibly unreachable',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      else {
        throw new HttpException(
          'Product failed to create.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  update() {}
  delete() {}
  async findById(product_id) {
    try {
      const product = await db.product.findUnique({
        where: {
          id: product_id,
        },
      });
      await db.$disconnect();
      return product;
    } catch (err) {
      console.error(err);
      await db.$disconnect();
      if (err instanceof PrismaClientInitializationError)
        throw new HttpException(
          'Database is possibly unreachable',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      else {
        throw new HttpException(
          'Product failed to create.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findAll() {
    try {
      const allProducts = await db.product.findMany();
      await db.$disconnect();
      return allProducts;
    } catch (err) {
      console.error(err);
      await db.$disconnect();
      return;
    }
  }
}
