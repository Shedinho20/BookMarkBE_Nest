import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../Presistence/UserRepository';
import { EditUserRequest } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async editUser(id: number, userDetails: EditUserRequest) {
    return this.userRepository.editUser(id, userDetails);
  }
}
