import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator/getUser';
import { UserResult } from '../auth/strategy/Interface/strategy.interface';
import { EditUserRequest, EditUserResult } from './dto/user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@GetUser() user: UserResult): Promise<UserResult> {
    return user;
  }

  @Patch()
  async editUser(@Body() userDetails: EditUserRequest, @GetUser('id') userId: number): Promise<EditUserResult> {
    const response = await this.userService.editUser(userId, userDetails);

    const editedUserResult = {
      email: response.email,
      firstname: response.firstname,
      lastname: response.lastname,
    };

    return editedUserResult;
  }
}
