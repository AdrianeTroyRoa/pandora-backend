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

  async create(newProduct) {
    console.info('Creating product...');

    //saving user info to database
    try {
      await db.product.create({
        data: {
          //product columns
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
  find(product_id) {}
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
