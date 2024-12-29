import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '../../node_modules/@prisma/client/runtime/library';

const db = new PrismaClient();

@Injectable()
export class InquiryService {
  getHello() {
    return 'Hello Inquiry World!';
  }

  async create(newInquiry) {
    console.info('Creating inquiry...');

    //saving user info to database
    try {
      await db.inquiry.create({
        data: {
          name: newInquiry.name,
          email: newInquiry.email,
          mobile_num: newInquiry.mobile_num,
          subject: newInquiry.subject,
          message: newInquiry.message,
        },
      });
      await db.$disconnect();
      console.info('Inquiry created');
      return 'Inquiry created';
    } catch (err) {
      console.error(err);
      await db.$disconnect();
      if (err instanceof PrismaClientKnownRequestError)
        throw new HttpException(
          'Inquiry already exists. Cannot create',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      else if (err instanceof PrismaClientInitializationError) {
        throw new HttpException(
          'Database is possibly unreachable',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Inquiry failed to create',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  update() {}
  delete() {}
  find(inquiry_id) {}
  async findAll() {
    try {
      const allInquiry = await db.inquiry.findMany();
      await db.$disconnect();
      return allInquiry;
    } catch (err) {
      console.error(err);
      await db.$disconnect();
      return;
    }
  }
}
