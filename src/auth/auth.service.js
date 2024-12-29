import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '../../node_modules/@prisma/client/runtime/library';

const db = new PrismaClient();

@Injectable()
export class AuthService {
  getHello() {
    return 'Hello Auth World!';
  }

  async create(newUser) {
    console.info('Creating user...');
    const hashedPassword = await bcrypt.hash(newUser.password, 10); //hashing the user password

    //saving user info to database
    try {
      await db.user.create({
        data: {
          email: newUser.email,
          mobile_number: newUser.mobile_number,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          password: hashedPassword,
        },
      });
      await db.$disconnect();
      console.info('User created');
      return 'User created';
    } catch (err) {
      console.error(err);
      await db.$disconnect();
      if (err instanceof PrismaClientKnownRequestError)
        throw new HttpException(
          'User email or number is already registered. Cannot create new user.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      else if (err instanceof PrismaClientInitializationError)
        throw new HttpException(
          'Database is possibly unreachable',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      else {
        throw new HttpException(
          'User info failed to register.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  update() {}
  delete() {}
  find(user_id) {}
  async findAll() {
    try {
      const allUsers = await db.user.findMany();
      await db.$disconnect();
      return allUsers;
    } catch (err) {
      console.error(err);
      await db.$disconnect();
      process.exit(1);
    }
  }
}
