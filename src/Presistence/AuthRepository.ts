import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserBody } from './Interfaces/authRepository.interface';

@Injectable({})
export class AuthRepository extends PrismaService {
  constructor() {
    super();
  }

  CreateUser(_user: CreateUserBody): Promise<User> {
    const user = this.user.create({ data: _user });

    return user;
  }

  GetUserByEmail(email: string): Promise<User> {
    const user = this.user.findUnique({ where: { email: email } });

    return user;
  }
}
