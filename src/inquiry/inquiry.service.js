import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '../../node_modules/@prisma/client/runtime/library';

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
          //inquiry columns
        },
      });
      await db.$disconnect();
      console.info('Inquiry created');
      return 'Inquiry created';
    } catch (err) {
      console.error(err);
      await db.$disconnect();
      if (err instanceof PrismaClientKnownRequestError)
        throw new BadRequestException(
          'Inquiry already exists. Cannot create.',
        );
      else {
        throw new BadRequestException('Inquiry failed to create.');
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
