import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '../../node_modules/@prisma/client/runtime/library';

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
        throw new BadRequestException(
          'User email or number is already registered. Cannot create new user.',
        );
      else {
        throw new BadRequestException('User info failed to register.');
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
