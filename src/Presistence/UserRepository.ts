import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserUserBody } from './Interfaces/userRepository.interface';

@Injectable({})
export class UserRepository extends PrismaService {
  constructor() {
    super();
  }

  editUser(id: number, userDetails: EditUserUserBody): Promise<User> {
    const user = this.user.update({
      where: {
        id: id,
      },
      data: {
        ...userDetails,
      },
    });

    return user;
  }
}
