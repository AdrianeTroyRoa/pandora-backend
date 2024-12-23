import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

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
      return 'User created';
    } catch (err) {
      console.error(err);
      await db.$disconnect();
      process.exit(1);
    }
  }
  update() {}
  delete() {}
  find(user_id) {}
  findAll() {}
}
